import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, NavBlade, Title, BlockText } from './VocalUI';

export default function GuidedRoutine() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const questions = [
    {
      id: 1,
      text: "How does your voice feel right now?",
      options: [
        { label: "A bit tired or raspy", value: "stretches-massage" },
        { label: "Tight in the chest", value: "breathing-exercises" },
        { label: "Ready to work!", value: "sovt-exercises" }
      ]
    },
    {
      id: 2,
      text: "What is your main goal for this session?",
      options: [
        { label: "Just a gentle warmup", value: "sovt-exercises" },
        { label: "Improving my range", value: "vowel-training" },
        { label: "Accuracy and pitch", value: "ear-training" }
      ]
    }
  ];

  const handleSelection = (value) => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      navigate(`/player/${value}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px' }}>
      
      {/* Progress Indicator using normalized BlockText style */}
      <BlockText style={{ marginBottom: '15px', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>
        Step {step} of {questions.length}
      </BlockText>

      {/* Main Container using GlassCard */}
      <GlassCard style={{ maxWidth: '500px', textAlign: 'center' }}>
        <Title style={{ fontSize: '1.8rem', marginBottom: '35px' }}>
          {questions[step - 1].text}
        </Title>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
          {questions[step - 1].options.map((opt) => (
            <NavBlade 
              key={opt.label} 
              onClick={() => handleSelection(opt.value)}
              style={{ justifyContent: 'center', height: 'auto', padding: '18px' }}
            >
              <span style={{ fontWeight: '600' }}>{opt.label}</span>
            </NavBlade>
          ))}
        </div>
      </GlassCard>

      {/* Secondary Action */}
      <button 
        onClick={() => navigate('/')} 
        style={{ marginTop: '30px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
      >
        Cancel and return home
      </button>
    </div>
  );
}