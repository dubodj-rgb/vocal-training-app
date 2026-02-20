import { useState, useRef, useEffect } from 'react';
import { usePitchTracker } from '../hooks/usePitchTracker';
import StaffVisualizer from './StaffVisualizer';
import CameraFeed from './CameraFeed';
import { GlassCard, ActionButton, BlockText, ButtonGroup } from './VocalUI';

export default function PitchMatchPlayer({ exercise }) {
  const audioRef = useRef(null);
  const data = exercise || { title: "Exercise", description: "Loading..." };
  const { pitch, note, isListening, recordedUrl, sessionPitches, startListening, stopListening } = usePitchTracker();
  
  // 1. VOICAL PROFILE INTEGRATION: Load the user's range
  const profile = JSON.parse(localStorage.getItem('vocalProfile') || 'null');
  
  // 2. TRANSPOSITION LOGIC: Shift frequencies to fit the user's voice
  let adjustedFreq = data.targetFreq;
  let adjustedNote = data.targetNote;

  if (profile && data.targetFreq > 0) {
    // If the target is higher than your comfortable max, drop it an octave
    if (data.targetFreq > profile.high) {
      adjustedFreq = data.targetFreq / 2;
      adjustedNote = adjustedNote.replace(/\d/, (n) => parseInt(n) - 1);
    } 
    // If the target is lower than your comfortable min, raise it an octave
    else if (data.targetFreq < profile.low) {
      adjustedFreq = data.targetFreq * 2;
      adjustedNote = adjustedNote.replace(/\d/, (n) => parseInt(n) + 1);
    }
  }

  const isCorrect = note !== "-" && note === adjustedNote;
  const feedbackColor = isCorrect ? '#4CAF50' : 'var(--lava-fuschia)'; 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [score, setScore] = useState(null);
  const [mirrorMode, setMirrorMode] = useState(false);

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);
  
  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
      audioRef.current.pause();
      setIsPlaying(false);
      
      // Calculate score based on the ADJUSTED frequency
      setTimeout(() => {
        if (sessionPitches.length > 0) {
          const target = adjustedFreq;
          const hits = sessionPitches.filter(p => Math.abs(p - target) / target < 0.10);
          setScore(Math.round((hits.length / sessionPitches.length) * 100));
        }
      }, 150);
    } else {
      setScore(null);
      startListening();
      audioRef.current.currentTime = 0; 
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Description Layer */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '18px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <BlockText style={{ margin: 0, fontSize: '1.05rem', fontStyle: 'italic', opacity: 0.8 }}>
          {data.description}
        </BlockText>
        <button 
          onClick={() => setMirrorMode(!mirrorMode)} 
          style={{ 
            fontSize: '0.75rem', 
            background: 'rgba(255,255,255,0.1)', 
            border: 'none', 
            color: 'white', 
            padding: '8px 12px', 
            borderRadius: '12px',
            cursor: 'pointer',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          {mirrorMode ? '✕ Hide Mirror' : '📷 Mirror'}
        </button>
      </div>

      {/* Main Visualizer Area */}
      <div style={{ 
        background: 'rgba(0,0,0,0.2)', 
        borderRadius: '32px', 
        padding: '25px',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2)'
      }}>
        
        {mirrorMode && (
          <div style={{ 
            borderRadius: '20px', 
            overflow: 'hidden', 
            background: '#000', 
            height: '300px', 
            marginBottom: '25px', 
            border: '1px solid rgba(255,255,255,0.1)' 
          }}>
            <CameraFeed />
          </div>
        )}

        {/* Audio Player Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <button onClick={togglePlay} style={playButtonStyle}>
            {isPlaying ? 'Ⅱ' : '▶'}
          </button>
          <div style={{ flexGrow: 1 }}>
            <input 
              type="range" min="0" max={duration || 0} value={currentTime} 
              onChange={(e) => audioRef.current.currentTime = e.target.value}
              style={{ width: '100%', accentColor: 'var(--lava-fuschia)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.7rem', marginTop: '8px', letterSpacing: '1px' }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* The Staff - Passes adjusted variables for transposition */}
        <div style={{ padding: '10px', marginBottom: '30px' }}>
          <StaffVisualizer 
            currentTime={currentTime} 
            duration={duration} 
            isListening={isListening}
            currentNote={note} 
            targetNote={adjustedNote} 
            targetPos={data.staffPosition} // You may want to adjust this position too if shifting octaves
            feedbackColor={feedbackColor} 
            sessionPitches={sessionPitches} 
          />
        </div>

        <ButtonGroup vertical>
          <ActionButton onClick={handleMicToggle} style={{ 
            padding: '20px', 
            background: isListening ? 'rgba(255,0,255,0.2)' : 'var(--lava-fuschia)',
            boxShadow: isListening ? 'none' : '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            {isListening ? 'STOP RECORDING' : 'START MY TURN'}
          </ActionButton>
        </ButtonGroup>

        {score !== null && !isListening && (
          <div style={resultsCardStyle(score)}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '2px', marginBottom: '5px' }}>Performance</div>
            <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 'bold' }}>{score}% Accuracy</h2>
            {recordedUrl && <audio src={recordedUrl} controls style={{ width: '100%', marginTop: '20px', height: '36px', opacity: 0.8 }} />}
          </div>
        )}
      </div>

      <audio ref={audioRef} src={data.audioSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}

const playButtonStyle = {
  width: '60px', height: '60px', borderRadius: '50%', border: 'none', flexShrink: 0,
  background: 'var(--lava-fuschia)', color: 'white', fontSize: '1.4rem',
  cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0
};

const resultsCardStyle = (score) => ({
  marginTop: '30px', 
  padding: '30px', 
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: `1px solid ${score >= 70 ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 152, 0, 0.3)'}`,
  color: score >= 70 ? '#4CAF50' : '#FF9800',
  textAlign: 'center'
});

function formatTime(seconds) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}