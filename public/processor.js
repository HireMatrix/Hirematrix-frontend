class PCMProcessor extends AudioWorkletProcessor {
    process(inputs) {
      const input = inputs[0];
      if (input.length > 0) {
        const channelData = input[0]; // mono channel
        const int16Data = new Int16Array(channelData.length);
        for (let i = 0; i < channelData.length; i++) {
          int16Data[i] = channelData[i] * 0x7fff; // Convert float [-1,1] to int16
        }
  
        this.port.postMessage(int16Data.buffer, [int16Data.buffer]);
      }
      return true;
    }
  }
  
  registerProcessor("pcm-processor", PCMProcessor);
  