import { useEffect, useRef, useState } from 'react'
import socket from '../socket/socket';

const useResumeReview = () => {

    const isConnectedRef = useRef(false);
    const [status, setStatus] = useState('Please wait...');
    const [resumeResult, setResumeResult] = useState();
    
    useEffect(() => {
        socket.on('resumeStatus', (data) => {
            setStatus(data.message);
        })
        socket.on("resumeResult", (data) => {
            setResumeResult(data.analyzed_result)
        })
        socket.on("error", (err) => {
            console.log("Socket Error:", err)
        })
        
        isConnectedRef.current = true;

        return () => {
            socket.off('resumeStatus');
            socket.off("resumeResult");
            socket.off("error");
            isConnectedRef.current = false;
        }
    }, [])

    const sendResumeForAnalysis = (resume) => {
        console.log(resume);
        if(socket.connected && isConnectedRef.current) {
            socket.emit("analyze_resume", resume);
        } else {
            console.log("Socket not connected");
        }
    }

    return {status, sendResumeForAnalysis, resumeResult}
}

export default useResumeReview
