import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Hammer, Library, Trash2, Flame, CheckCircle, User } from 'lucide-react';
import { NavBlade, Title, SubTitle, BlockText, GlassCard, InfoTag } from './VocalUI';

export default function LandingPage() {
  const navigate = useNavigate();
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [stats, setStats] = useState({ streak: 0, practicedToday: false });
  const [vocalProfile, setVocalProfile] = useState(null);

  useEffect(() => {
    try {
      setSavedRoutines(JSON.parse(localStorage.getItem('vocalRoutines') || '[]'));
      
      const savedStats = JSON.parse(localStorage.getItem('vocalStats') || '{"streak": 0, "lastDate": null}');
      const today = new Date().toDateString();
      const practicedToday = savedStats.lastDate === today;
      
      let currentStreak = savedStats.streak;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (!practicedToday && savedStats.lastDate !== yesterday.toDateString()) {
        currentStreak = 0; 
      }

      setStats({ streak: currentStreak, practicedToday });
      setVocalProfile(JSON.parse(localStorage.getItem('vocalProfile')));
    } catch (e) {
      console.error("Error loading data:", e);
    }
  }, []);

  const handleDeleteRoutine = (e, indexToRemove) => {
    e.stopPropagation(); 
    if (window.confirm("Delete this routine?")) {
      const updated = savedRoutines.filter((_, index) => index !== indexToRemove);
      setSavedRoutines(updated);
      localStorage.setItem('vocalRoutines', JSON.stringify(updated));
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title style={{ fontSize: '3rem', marginBottom: '25px' }}>
          Voice Trainer Pro
        </Title>

        {/* Consistent Dashboard Row using InfoTag */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <InfoTag 
            icon={Flame} 
            label="Streak" 
            value={`${stats.streak} Days`} 
            color={stats.streak > 0 ? "#ff4444" : null} 
          />
          
          <InfoTag 
            icon={CheckCircle} 
            label="Daily Warmup" 
            value={stats.practicedToday ? "Done!" : "Pending"} 
            color={stats.practicedToday ? "#4CAF50" : null} 
          />

          <InfoTag 
            icon={User} 
            label="Voice Type" 
            value={vocalProfile ? vocalProfile.voiceType : "Unset"} 
            color={vocalProfile ? "var(--lava-fuschia)" : null}
            onClick={() => navigate('/calibrate')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <NavBlade onClick={() => navigate('/routine/guided')} style={customBladeStyle}>
          <div style={iconBoxStyle}><Sparkles size={28} color="var(--lava-fuschia)" /></div>
          <div style={textContainerStyle}>
            <h2 style={bladeTitleStyle}>Guided Routine</h2>
            <BlockText style={{ fontSize: '0.9rem', margin: 0 }}>Smart warmup built for your goals.</BlockText>
          </div>
        </NavBlade>

        <NavBlade onClick={() => navigate('/routine/builder')} style={customBladeStyle}>
          <div style={iconBoxStyle}><Hammer size={28} color="var(--lava-fuschia)" /></div>
          <div style={textContainerStyle}>
            <h2 style={bladeTitleStyle}>Build My Own</h2>
            <BlockText style={{ fontSize: '0.9rem', margin: 0 }}>Custom workout from your library.</BlockText>
          </div>
        </NavBlade>

        <NavBlade onClick={() => navigate('/library')} style={customBladeStyle}>
          <div style={iconBoxStyle}><Library size={28} color="var(--lava-fuschia)" /></div>
          <div style={textContainerStyle}>
            <h2 style={bladeTitleStyle}>Explore Library</h2>
            <BlockText style={{ fontSize: '0.9rem', margin: 0 }}>Full collection of techniques.</BlockText>
          </div>
        </NavBlade>

        {savedRoutines.length > 0 && (
          <div style={{ marginTop: '30px', width: '100%', maxWidth: '600px' }}>
            <SubTitle style={{ fontSize: '0.8rem', marginBottom: '20px', textAlign: 'center', opacity: 0.5, letterSpacing: '2px' }}>
              SAVED ROUTINES
            </SubTitle>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {savedRoutines.map((routine, index) => (
                <GlassCard 
                  key={routine.id || index}
                  onClick={() => navigate('/play')}
                  style={routineCardStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                    {(routine.isSmart || routine.name.startsWith("Smart")) && (
                      <div style={badgeStyle}><Sparkles size={16} color="var(--lava-fuschia)" /></div>
                    )}
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: 'white' }}>{routine.name}</h3>
                      <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.5 }}>{Object.keys(routine.exercises || {}).length} Exercises</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={(e) => handleDeleteRoutine(e, index)} style={deleteButtonStyle}><Trash2 size={18} /></button>
                    <span style={{ fontSize: '1.2rem', color: 'var(--lava-fuschia)' }}>▶</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const customBladeStyle = { height: '85px', display: 'flex', alignItems: 'center' };
const iconBoxStyle = { width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', flexShrink: 0 };
const textContainerStyle = { textAlign: 'left', display: 'flex', flexDirection: 'column' };
const bladeTitleStyle = { fontSize: '1.2rem', margin: 0, fontWeight: '700', color: 'white' };
const routineCardStyle = { padding: '18px 25px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid var(--lava-fuschia)' };
const badgeStyle = { background: 'rgba(255, 0, 255, 0.1)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255, 0, 255, 0.2)' };
const deleteButtonStyle = { background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer' };