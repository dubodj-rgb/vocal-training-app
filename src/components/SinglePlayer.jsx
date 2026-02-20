import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlassCard, ActionButton } from './VocalUI';
import { exerciseData } from '../data/exercises';
import VocalPlayer from './VocalPlayer';

export default function SinglePlayer() {
  const { category } = useParams(); 
  const navigate = useNavigate();

  const currentExercise = exerciseData[category];

  if (!currentExercise) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2>Exercise Not Found</h2>
        <p style={{ opacity: 0.7 }}>We couldn't find that specific exercise.</p>
        <ActionButton onClick={() => navigate('/library')}>Back to Library</ActionButton>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px 15px', // Standardized padding
      maxWidth: '600px', 
      margin: '0 auto', 
      // REMOVED minHeight: '100vh' and justifyContent: 'center'
      display: 'flex', 
      flexDirection: 'column'
    }}>
      
      <GlassCard style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '20px 15px', 
        height: 'auto',              
        minHeight: 'fit-content'     
      }}>
        
        {/* REMOVED the <h2> Title. The Header handles it now! */}
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
           <VocalPlayer exercise={currentExercise} />
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={() => navigate('/library')} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'rgba(255,255,255,0.4)', 
              cursor: 'pointer',
              padding: '10px',
              fontSize: '0.9rem',
              textDecoration: 'underline'
            }}
          >
            Return to Library
          </button>
        </div>

      </GlassCard>
    </div>
  );
}