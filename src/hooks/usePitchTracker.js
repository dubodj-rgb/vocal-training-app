import { useState, useRef } from 'react';

export function usePitchTracker() {
  const [pitch, setPitch] = useState(null);
  const [note, setNote] = useState("-");
  const [isListening, setIsListening] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [sessionPitches, setSessionPitches] = useState([]);

  const audioCtx = useRef(null);
  const analyser = useRef(null);
  const stream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const activeLoop = useRef(false);

  const startListening = async () => {
    setSessionPitches([]);
    setRecordedUrl(null);
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    analyser.current = audioCtx.current.createAnalyser();
    analyser.current.fftSize = 2048;
    
    stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioCtx.current.createMediaStreamSource(stream.current);
    source.connect(analyser.current);
    
    mediaRecorder.current = new MediaRecorder(stream.current);
    chunks.current = [];
    
    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
    };

    mediaRecorder.current.start();
    setIsListening(true);
    activeLoop.current = true;
    loop();
  };

  const stopListening = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    }
    if (stream.current) {
      stream.current.getTracks().forEach(t => t.stop());
    }
    activeLoop.current = false;
    setIsListening(false);
    setNote("-");
    setPitch(null);
  };

  const loop = () => {
    if (!activeLoop.current || !analyser.current) return;
    
    const buffer = new Float32Array(analyser.current.fftSize);
    analyser.current.getFloatTimeDomainData(buffer);
    
    const freq = autoCorrelate(buffer, audioCtx.current.sampleRate);
    
    if (freq !== -1) {
      const pitchVal = Math.round(freq);
      setPitch(pitchVal);
      setNote(getNoteFromFrequency(freq));
      setSessionPitches(prev => [...prev, pitchVal]);
    }
    
    requestAnimationFrame(loop);
  }; // <--- THIS WAS MISSING

  const autoCorrelate = (buffer, sampleRate) => {
    let SIZE = buffer.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
    for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    
    const buf = buffer.slice(r1, r2);
    SIZE = buf.length;
    const c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i];
    }
    let d = 0; while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
    }
    return sampleRate / maxpos;
  };

  const getNoteFromFrequency = (freq) => {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const number = 12 * (Math.log2(freq / 440)) + 69;
    return notes[Math.round(number) % 12];
  };

  return { 
    pitch, 
    note, 
    isListening, 
    recordedUrl, 
    sessionPitches, 
    startListening, 
    stopListening 
  };
} // <--- THIS WAS ALSO MISSING