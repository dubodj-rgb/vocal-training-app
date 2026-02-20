import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VocalAccordion } from './VocalUI';
import { exerciseData } from '../data/exercises';

export default function LibraryView() {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(null);

  // Group exercises by category dynamically
  const categories = Object.keys(exerciseData).reduce((acc, key) => {
    const exercise = exerciseData[key];
    const categoryName = key.split('-')[0].toUpperCase();
    
    const existingCategory = acc.find(c => c.name === categoryName);

    if (existingCategory) {
      // We store the 'key' (e.g., 'sovt-liptrill') as the value so we can route to it
      existingCategory.exercises.push({ label: exercise.title, value: key });
    } else {
      acc.push({
        id: categoryName.toLowerCase(),
        name: categoryName,
        exercises: [{ label: exercise.title, value: key }]
      });
    }
    
    return acc;
  }, []);

  const handleSelectExercise = (exerciseKey) => {
    // Route the user to a single-player view passing the specific exercise key
    navigate(`/library/${exerciseKey}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px', // Tightly stacks the accordions
        marginTop: '20px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {categories.map((cat) => (
          <VocalAccordion
            key={cat.id}
            title={cat.name}
            selectedValue={null} // We don't need a persistent selection highlight here
            options={cat.exercises}
            onSelect={(val) => handleSelectExercise(val)}
            isOpen={openCategory === cat.id}
            onToggle={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
          />
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', opacity: 0.4, fontSize: '0.8rem' }}>
        Select a specific technique to jump right in.
      </div>
    </div>
  );
}