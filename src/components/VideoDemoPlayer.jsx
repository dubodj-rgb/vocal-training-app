import React from 'react';
import { BlockText } from './VocalUI';

export default function VideoDemoPlayer({ exercise }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '25px' }}>
      
      {/* Video Container - Removed Shadow for the "Clean" look */}
      <div style={{
        width: '100%',
        aspectRatio: '16 / 9',
        background: 'rgba(0,0,0,0.2)', // Slightly darker "well"
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {exercise.videoSrc ? (
          <video 
            src={exercise.videoSrc} 
            controls 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', opacity: 0.3 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎬</div>
            <BlockText style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Video coming soon
            </BlockText>
          </div>
        )}
      </div>

      {/* Description */}
      <BlockText style={{ 
        margin: 0, 
        fontSize: '1.05rem', 
        lineHeight: '1.6', 
        textAlign: 'center',
        color: 'white',
        opacity: 0.9
      }}>
        {exercise.description}
      </BlockText>

      {/* Tip Box - Swapped the magenta border for a subtle glass border */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        padding: '18px',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <BlockText style={{ fontSize: '0.85rem', opacity: 0.7, margin: 0, lineHeight: '1.5' }}>
          <strong style={{ color: 'white', opacity: 1, letterSpacing: '1px' }}>COACH TIP:</strong> Focus on slow, intentional movements. If you feel any sharp pain, stop immediately.
        </BlockText>
      </div>
    </div>
  );
}