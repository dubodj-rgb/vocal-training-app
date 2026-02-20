import { useState, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { BlockText } from './VocalUI';

export default function StandardAudioPlayer({ exercise }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const barDelays = useMemo(() => {
    return Array.from({ length: 24 }).map(() => Math.random() * -1.5);
  }, []);

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);
  
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    audioRef.current.currentTime = 0;
    if (!isPlaying) togglePlay();
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '25px' }}>
      
      {/* Description */}
      <BlockText style={{ margin: 0, fontSize: '1.05rem', fontStyle: 'italic', textAlign: 'center', opacity: 0.8 }}>
        {exercise.description}
      </BlockText>

      {/* THE VISUALIZER BOX - Restored to its own distinct window */}
      <div style={{
        height: '120px',
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.2)'
      }}>
        {barDelays.map((delay, i) => (
          <div 
            key={i}
            className={`vis-bar ${isPlaying ? 'playing' : ''}`}
            style={{ 
              height: '60px', /* Fixed height stops them from breaking out of the box */
              opacity: isPlaying ? 1 : 0.3,
              animationDelay: `${delay}s`,
              animationDuration: `${0.8 + (Math.random() * 0.4)}s`
            }}
          />
        ))}
      </div>

      {/* Play Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
        <button onClick={handleReset} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.6 }}>
          <RotateCcw size={24} />
        </button>

        <button onClick={togglePlay} style={{
            width: '72px', height: '72px', borderRadius: '50%', background: 'var(--lava-fuschia)',
            border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: isPlaying ? '0 0 20px rgba(255, 0, 255, 0.6)' : '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.1s ease',
            transform: isPlaying ? 'scale(0.95)' : 'scale(1)'
          }}>
          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />}
        </button>
        
        <div style={{ width: '24px' }}></div> 
      </div>

      {/* Slider */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input type="range" min="0" max={duration || 0} value={currentTime} 
          onChange={(e) => audioRef.current.currentTime = e.target.value}
          style={{ width: '100%', accentColor: 'var(--lava-fuschia)', cursor: 'pointer' }}
        />
      </div>

      <audio ref={audioRef} src={exercise.audioSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}