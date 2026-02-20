import React from 'react';

export default function StaffVisualizer({ 
  currentTime, 
  duration, 
  isListening, 
  currentNote, 
  targetNote, 
  targetPos, 
  feedbackColor, 
  sessionPitches = [] 
}) {
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const width = 800; 
  const height = 140;

  const getYForPitch = (freq) => {
    if (!freq) return height / 2;
    const b4Freq = 493.88;
    const pixelsPerSemitone = 6;
    const semitonesOff = 12 * Math.log2(freq / b4Freq);
    const targetY = (targetPos / 100) * height;
    return targetY - (semitonesOff * pixelsPerSemitone);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '140px', 
      background: 'rgba(0, 0, 0, 0.4)', // Darkened for professional "Instrument" feel
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '16px', 
      overflow: 'hidden', 
      position: 'relative',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.4)'
    }}>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {/* Staff Lines */}
        {[...Array(5)].map((_, i) => (
          <line 
            key={i} 
            x1="0" y1={40 + (i * 12)} 
            x2={width} y2={40 + (i * 12)} 
            stroke="rgba(255, 255, 255, 0.2)" 
            strokeWidth="1" 
          />
        ))}

        {/* Target Frequency Line */}
        <line 
          x1="0" y1={(targetPos / 100) * height} 
          x2={width} y2={(targetPos / 100) * height} 
          stroke="#FFD700" 
          strokeWidth="1.5" 
          strokeDasharray="8 4"
          opacity="0.6"
        />

        {/* Live Pitch Trail */}
        {sessionPitches.map((p, i) => {
          const xPos = (i / sessionPitches.length) * (progress / 100) * width;
          const yPos = getYForPitch(p);
          return (
            <circle 
              key={i} 
              cx={xPos} 
              cy={yPos} 
              r="2.5" 
              fill="var(--lava-fuschia)" 
              style={{ filter: 'drop-shadow(0 0 4px var(--lava-fuschia))' }}
            />
          );
        })}

        {/* Playhead */}
        <line 
          x1={`${progress}%`} y1="0" 
          x2={`${progress}%`} y2={height} 
          stroke="var(--lava-fuschia)" 
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 8px var(--lava-fuschia))' }} 
        />
      </svg>

      {/* Normalized Labeling */}
      <div style={{
        position: 'absolute',
        left: '55px',
        top: `${targetPos}%`,
        transform: 'translateY(-110%)',
        fontSize: '0.6rem',
        color: '#FFD700',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        opacity: 0.8
      }}>
        Target {targetNote}
      </div>

      <div style={{ 
        position: 'absolute', 
        left: '15px', 
        top: '50%', 
        transform: 'translateY(-55%)', 
        fontSize: '3rem', 
        color: 'white', 
        opacity: 0.15, 
        pointerEvents: 'none'
      }}>
        𝄞
      </div>

      {/* Dynamic Feedback Badge */}
      {isListening && (
        <div style={{
          position: 'absolute',
          right: '12px',
          bottom: '12px',
          background: 'var(--lava-fuschia)',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: '900',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          {currentNote}
        </div>
      )}
    </div>
  );
}