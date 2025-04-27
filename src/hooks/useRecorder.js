import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket/socket';
import { setFinalText, setPartialText } from '../features/transcription/transcriptionSlice';

const useRecorder = () => {
    const dispatch = useDispatch();
    const streamRef = useRef(null);
    const audioContextRef = useRef(null);
    const workletNodeRef = useRef(null);
    const sourceRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);

    const pcmBufferRef = useRef([]);
    const pcmBufferLengthRef = useRef(0);

    useEffect(() => {
        socket.on("partial", (text) => dispatch(setPartialText(text)));
        socket.on("transcript", (text) => dispatch(setFinalText(text)));
        socket.on("error", (err) => console.log(err));

        return () => {
            socket.off("partial");
            socket.off("transcript");
            socket.off("error");
            stopRecording();
        };
    }, [dispatch]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const audioContext = new AudioContext({ sampleRate: 16000 });
            audioContextRef.current = audioContext;

            await audioContext.audioWorklet.addModule("/processor.js");

            const source = audioContext.createMediaStreamSource(stream);
            sourceRef.current = source;

            const workletNode = new AudioWorkletNode(audioContext, "pcm-processor");
            workletNodeRef.current = workletNode;

            workletNode.port.onmessage = (e) => {
                const chunk = new Int16Array(e.data);

                let maxVal = 0;
                for (let i = 0; i < chunk.length; i++) {
                    const ablVal = Math.abs(chunk[i]);
                    if(ablVal > maxVal) {
                        maxVal = ablVal;
                    }
                }

                const normalizedChunk = maxVal / 32768;

                if(normalizedChunk > 0.01) {
                    pcmBufferRef.current.push(chunk);
                    pcmBufferLengthRef.current += chunk.length;

                    // Sending when we have around 100ms (1600 samples @ 16kHz)
                    if (pcmBufferLengthRef.current >= 1600) {
                        const merged = new Int16Array(pcmBufferLengthRef.current);
                        let offset = 0;
                        pcmBufferRef.current.forEach(arr => {
                            merged.set(arr, offset);
                            offset += arr.length;
                        });

                        socket.emit("audio_chunk", merged.buffer);

                        pcmBufferRef.current = [];
                        pcmBufferLengthRef.current = 0;
                    }
                } else {
                    pcmBufferRef.current = [];
                    pcmBufferLengthRef.current = 0;
                }
            };

            source.connect(workletNode);
            workletNode.connect(audioContext.destination);

            setIsRecording(true);
            console.log("Recording started");
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const stopRecording = () => {
        try {
            if (sourceRef.current && workletNodeRef.current) {
                sourceRef.current.disconnect(workletNodeRef.current);
                workletNodeRef.current.disconnect();
            }

            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            sourceRef.current = null;
            workletNodeRef.current = null;
            audioContextRef.current = null;
            streamRef.current = null;
            pcmBufferRef.current = [];
            pcmBufferLengthRef.current = 0;

            setIsRecording(false);
        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };

    return { startRecording, stopRecording, isRecording };
};

export default useRecorder;