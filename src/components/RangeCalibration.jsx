import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, ActionButton, Title, BlockText } from './VocalUI';

export default function RangeCalibration() {
  const navigate = useNavigate();
  const [step, setStep] = useState('start'); // start, low, high, result
  const [currentPitch, setCurrentPitch] = useState(null);
  const [detectedRange, setDetectedRange] = useState({ low: null, high: null });
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const requestRef = useRef(null);

  // Simple Pitch Detection Logic (Standard Autocorrelation)
  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      source.connect(analyserRef.current);
      updatePitch();
    } catch (err) {
      alert("Microphone access is required for calibration.");
    }
  };

  const updatePitch = () => {
    const buffer = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buffer);
    const pitch = autoCorrelate(buffer, audioContextRef.current.sampleRate);
    
    if (pitch !== -1 && pitch > 50 && pitch < 1200) {
      setCurrentPitch(Math.round(pitch));
    }
    requestRef.current = requestAnimationFrame(updatePitch);
  };

  const stopListening = () => {
    cancelAnimationFrame(requestRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
  };

  const autoCorrelate = (buf, sampleRate) => {
    let SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    let c = new Float32Array(SIZE);
    for (let i = 0; i < SIZE; i++) for (let j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i];
    let d = 0; while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
    return sampleRate / maxpos;
  };

  const captureLow = () => {
    setDetectedRange(prev => ({ ...prev, low: currentPitch }));
    setStep('high');
  };

  const captureHigh = () => {
    setDetectedRange(prev => ({ ...prev, high: currentPitch }));
    stopListening();
    setStep('result');
  };

  const saveCalibration = () => {
    const voiceType = determineVoiceType(detectedRange.low, detectedRange.high);
    const vocalProfile = { ...detectedRange, voiceType };
    localStorage.setItem('vocalProfile', JSON.stringify(vocalProfile));
    navigate('/');
  };

  const determineVoiceType = (low, high) => {
    // Basic frequency-to-type mapping
    if (high > 800) return "Soprano";
    if (high > 600) return "Mezzo-Soprano";
    if (high > 450) return "Tenor";
    if (low < 100) return "Bass";
    if (low < 130) return "Baritone";
    return "Alto";
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <GlassCard style={{ padding: '40px 20px', borderRadius: '32px' }}>
        
        {step === 'start' && (
          <>
            <Title style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Range Finder</Title>
            <BlockText style={{ marginBottom: '30px', opacity: 0.8 }}>
              We'll listen to your lowest and highest comfortable notes to customize your exercises.
            </BlockText>
            <ActionButton onClick={() => { startListening(); setStep('low'); }}>
              Begin Calibration
            </ActionButton>
          </>
        )}

        {(step === 'low' || step === 'high') && (
          <>
            <Title style={{ fontSize: '1.4rem', textTransform: 'uppercase', color: 'var(--lava-fuschia)' }}>
              {step === 'low' ? "Sing your lowest note" : "Sing your highest note"}
            </Title>
            <div style={{ fontSize: '4rem', fontWeight: 'bold', margin: '40px 0', color: 'white' }}>
              {currentPitch ? `${currentPitch} Hz` : "--"}
            </div>
            <BlockText style={{ opacity: 0.6, marginBottom: '30px' }}>
              Hold a steady "Ah" vowel.
            </BlockText>
            <ActionButton onClick={step === 'low' ? captureLow : captureHigh} disabled={!currentPitch}>
              Capture {step === 'low' ? "Low" : "High"}
            </ActionButton>
          </>
        )}

        {step === 'result' && (
          <>
            <Title style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Calibration Complete</Title>
            <div style={{ 
              background: 'rgba(255,0,255,0.1)', 
              padding: '20px', 
              borderRadius: '20px', 
              margin: '20px 0',
              border: '1px solid var(--lava-fuschia)' 
            }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6 }}>Your Voice Type</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{determineVoiceType(detectedRange.low, detectedRange.high)}</div>
            </div>
            <BlockText style={{ marginBottom: '30px', opacity: 0.7 }}>
              Range: {detectedRange.low}Hz to {detectedRange.high}Hz
            </BlockText>
            <ActionButton onClick={saveCalibration}>Apply to My Profile</ActionButton>
          </>
        )}

      </GlassCard>
    </div>
  );
}