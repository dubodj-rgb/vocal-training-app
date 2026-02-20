import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, ActionButton, ButtonGroup } from './VocalUI';
import { exerciseData } from '../data/exercises'; 

export default function GuidedExperience() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      key: "state",
      text: "How does your voice feel right now?",
      options: [
        { label: "Tired or Raspy", value: "tired" },
        { label: "Tight / Stiff", value: "tight" },
        { label: "Normal / Neutral", value: "neutral" },
        { label: "Ready to Sing!", value: "ready" }
      ]
    },
    {
      key: "goal",
      text: "What is your goal for this session?",
      options: [
        { label: "Gentle Recovery", value: "recovery" },
        { label: "Daily Maintenance", value: "maintenance" },
        { label: "Speed & Agility", value: "agility" },
        { label: "Range & Power", value: "range" }
      ]
    }
  ];

  const generateSmartRoutine = (finalAnswers) => {
    const { state, goal } = finalAnswers;
    let routineKeys = [];

    if (state === 'tired' || state === 'tight') {
      routineKeys.push('stretches-jaw', 'stretches-scm');
    }

    routineKeys.push('breathing-farinelli');
    routineKeys.push('sovt-liptrill');

    if (goal === 'recovery' || state === 'tired') {
      routineKeys.push('sovt-puffycheeks');
    } else {
      routineKeys.push('sovt-tonguetrills');
    }

    if (goal === 'agility') {
      routineKeys.push('agility-staccato', 'agility-9note');
    } else if (goal === 'range') {
      routineKeys.push('agility-sweeping', 'vowel-messa');
    } else if (goal === 'maintenance') {
      routineKeys.push('vowel-matching', 'ear-perfect5th');
    }

    const selectedExercises = {};
    routineKeys.forEach(key => {
      if (exerciseData[key]) {
        selectedExercises[key] = exerciseData[key].title;
      }
    });

    return {
      id: Date.now(),
      name: "Smart Warmup: " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      exercises: selectedExercises,
      isSmart: true, // <--- This tag triggers the ✨ icon on the Landing Page
      timestamp: new Date().toISOString()
    };
  };

  const handleSelection = (value) => {
    const updatedAnswers = { ...answers, [questions[step].key]: value };
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const smartRoutine = generateSmartRoutine(updatedAnswers);
      const existing = JSON.parse(localStorage.getItem('vocalRoutines') || '[]');
      existing.push(smartRoutine);
      localStorage.setItem('vocalRoutines', JSON.stringify(existing));
      navigate('/play');
    }
  };

  const currentQ = questions[step];

  return ( 
    <div style={{ 
      padding: '20px', 
      maxWidth: '500px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column',
      marginTop: '20px' 
    }}>

      <GlassCard style={{ 
        padding: '40px 25px', 
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        background: 'rgba(255, 255, 255, 0.05)',
        boxShadow: 'none' 
      }}>
        <h3 style={{ 
          color: 'white', 
          fontSize: '1.25rem', 
          textAlign: 'center', 
          margin: '0 0 35px 0', 
          lineHeight: '1.4',
          fontWeight: '500'
        }}>
          {currentQ.text}
        </h3>

        <ButtonGroup vertical gap="12px">
          {currentQ.options.map((opt) => (
            <ActionButton 
              key={opt.label} 
              onClick={() => handleSelection(opt.value)}
              style={{ 
                padding: '22px', 
                fontSize: '0.95rem', 
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600',
                boxShadow: 'none' 
              }}
            >
              {opt.label}
            </ActionButton>
          ))}
        </ButtonGroup>

        <div style={{ 
          marginTop: '30px', 
          textAlign: 'center', 
          opacity: 0.25, 
          fontSize: '0.7rem', 
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          Step {step + 1} of {questions.length}
        </div>
      </GlassCard>
    </div>
  );
}