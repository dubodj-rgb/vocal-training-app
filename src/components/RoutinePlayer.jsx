import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, ActionButton, ButtonGroup } from './VocalUI'; // Removed SubTitle, using standard h1
import { exerciseData } from '../data/exercises'; 
import VocalPlayer from './VocalPlayer';

export default function RoutinePlayer() {
  const navigate = useNavigate();
  
  const [routine, setRoutine] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('vocalRoutines') || '[]');
    const currentRoutine = stored[stored.length - 1];

    if (currentRoutine) {
      setRoutine(currentRoutine);
      
      const fullExercises = Object.values(currentRoutine.exercises).map(exerciseTitle => {
        for (const key in exerciseData) {
          if (exerciseData[key].title === exerciseTitle) {
            return { ...exerciseData[key], categoryId: key };
          }
        }
        return null;
      }).filter(Boolean); 
      
      setExerciseList(fullExercises);
    }
  }, []);

  if (!routine || exerciseList.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2>No Routine Found</h2>
        <p style={{ opacity: 0.7 }}>Build a routine first to test the player.</p>
        <ActionButton onClick={() => navigate('/builder')}>Go to Builder</ActionButton>
      </div>
    );
  }

  const currentExercise = exerciseList[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === exerciseList.length - 1;

  const handleNext = () => !isLast && setCurrentIndex(prev => prev + 1);
  const handlePrev = () => !isFirst && setCurrentIndex(prev => prev - 1);
const handleFinish = () => {
    try {
      // 1. Get existing stats or create default
      const savedStats = JSON.parse(localStorage.getItem('vocalStats') || '{"streak": 0, "lastDate": null, "totalSessions": 0}');
      
      const today = new Date().toDateString();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();

      let newStreak = savedStats.streak;
      let newTotalSessions = savedStats.totalSessions + 1;

      // 2. Logic: Only update streak if they haven't practiced yet today
      if (savedStats.lastDate !== today) {
        if (savedStats.lastDate === yesterdayString) {
          // Practiced yesterday? Streak continues!
          newStreak += 1;
        } else if (savedStats.lastDate === null || newStreak === 0) {
          // First time ever or after a reset? Start at 1.
          newStreak = 1;
        } else {
          // They missed at least one day? Reset to 1 (counting today).
          newStreak = 1;
        }
      }

      // 3. Save the updated stats
      const updatedStats = {
        streak: newStreak,
        lastDate: today,
        totalSessions: newTotalSessions
      };

      localStorage.setItem('vocalStats', JSON.stringify(updatedStats));
      
      alert("Routine Complete! Streak updated to " + newStreak + " days.");
      navigate('/'); 
    } catch (e) {
      console.error("Error saving stats:", e);
      navigate('/');
    }
  };

  return (
    <div style={{ 
      padding: '15px', /* REDUCED FROM 40px: Hugs the edges of the phone much better */
      maxWidth: '600px', 
      margin: '0 auto', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      {/* Header Info - Tightened up */}
      <header style={{ textAlign: 'center', marginBottom: '15px' }}>

        <div style={{ 
          fontSize: '0.8rem', 
          color: 'var(--lava-fuschia)', 
          fontWeight: 'bold', 
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          EXERCISE {currentIndex + 1} OF {exerciseList.length}
        </div>
      </header>

      {/* The Main Player Card */}
      <GlassCard style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '20px 15px', /* Slightly reduced inner padding for mobile */
      }}>
        {/* We keep the specific exercise title here so they know what they are doing */}
        <h2 style={{ margin: '0 0 15px 0', fontSize: '1.6rem', textAlign: 'center' }}>
          {currentExercise.title}
        </h2>
        
        {/* YOUR DYNAMIC VOCAL PLAYER */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
           <VocalPlayer exercise={currentExercise} />
        </div>

        {/* Navigation Controls */}
        <ButtonGroup style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          <ActionButton 
            onClick={handlePrev} 
            disabled={isFirst}
            style={{ 
              flex: 1, 
              opacity: isFirst ? 0.3 : 1, 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)' 
            }}
          >
            Prev
          </ActionButton>
          
          {isLast ? (
             <ActionButton onClick={handleFinish} style={{ flex: 2, background: 'var(--lava-fuschia)', color: 'white' }}>
               Finish Routine
             </ActionButton>
          ) : (
             <ActionButton onClick={handleNext} style={{ flex: 2, background: 'rgba(255,255,255,0.1)' }}>
               Next
             </ActionButton>
          )}
        </ButtonGroup>
      </GlassCard>
    </div>
  );
}