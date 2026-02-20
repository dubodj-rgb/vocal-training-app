import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GlassCard, 
  SubTitle, 
  VocalLabel, 
  VocalInput, 
  VocalAccordion, 
  ActionButton, 
  ButtonGroup 
} from './VocalUI';

// Import the dynamic data from your library
import { exerciseData } from '../data/exercises'; 

export default function RoutineBuilder() {
  const navigate = useNavigate();
  
  const [routineName, setRoutineName] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [selections, setSelections] = useState({});

  // FIXED: Properly group exercises by category
  const categories = Object.keys(exerciseData).reduce((acc, key) => {
    const exercise = exerciseData[key];
    // Formats ID: "sovt-liptrill" -> "SOVT"
    const categoryName = key.split('-')[0].toUpperCase(); 
    
    // Check if we already created an accordion for this category
    const existingCategory = acc.find(c => c.name === categoryName);

    if (existingCategory) {
      // If it exists, just add this exercise to its dropdown options
      existingCategory.exercises.push({ label: exercise.title, value: exercise.title });
    } else {
      // If it doesn't exist yet, create the category
      acc.push({
        id: categoryName.toLowerCase(), // e.g. "sovt"
        name: categoryName,
        exercises: [{ label: exercise.title, value: exercise.title }]
      });
    }
    
    return acc;
  }, []);

  const handleUpdate = (catId, value) => {
    setSelections(prev => ({ ...prev, [catId]: value }));
  };

  const handleSave = () => {
    // 1. Validate that at least a name exists
    if (!routineName.trim()) {
      alert("Please enter a routine name before saving.");
      return;
    }

    // 2. Package the data
    const newRoutine = {
      id: Date.now(), 
      name: routineName,
      exercises: selections, 
      timestamp: new Date().toISOString()
    };

    try {
      // 3. Save to LocalStorage
      const existingRoutines = JSON.parse(localStorage.getItem('vocalRoutines') || '[]');
      existingRoutines.push(newRoutine);
      localStorage.setItem('vocalRoutines', JSON.stringify(existingRoutines));

      console.log("Routine Saved Successfully:", newRoutine);
      
      // 4. Navigate back to Home/Dashboard
      navigate('/');
    } catch (error) {
      console.error("Error saving routine:", error);
      alert("Failed to save routine. Local storage might be full.");
    }
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <SubTitle style={{ fontSize: '1.4rem' }}>
          Design your perfect vocal session
        </SubTitle>
      </header>

      <GlassCard style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '25px', 
        transition: 'all 0.4s ease' 
      }}>
        {/* Name Input Section */}
        <div>
          <VocalLabel>Routine Name</VocalLabel>
          <VocalInput 
            placeholder="e.g. My Morning Mix" 
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
          />
        </div>

        {/* Dynamic Accordions from exercises.js */}
        <div>
          <VocalLabel>Select Exercises (One per category)</VocalLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {categories.map(cat => (
              <VocalAccordion
                key={cat.id}
                title={cat.name}
                selectedValue={selections[cat.id]}
                options={cat.exercises}
                onSelect={(val) => handleUpdate(cat.id, val)}
                isOpen={openCategory === cat.id}
                onToggle={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <ButtonGroup vertical style={{ marginTop: '10px' }}>
          <ActionButton onClick={handleSave}>
            Save Routine
          </ActionButton>
          
          <button 
            onClick={() => navigate('/')} 
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
            Discard Changes
          </button>
        </ButtonGroup>
      </GlassCard>
    </div>
  );
}