import React, { useState } from 'react';

// 1. Content Wrapper (Stable Glass Dashboard)
export const GlassCard = ({ children, style, ...props }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '30px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    color: 'white',
    ...style
  }} {...props}>
    {children}
  </div>
);

// 2. Nav Button (The Slanted "Blade")
export const NavBlade = ({ children, onClick, style, ...props }) => (
  <button 
    onClick={onClick}
    className="white-card" 
    style={{ border: 'none', textAlign: 'left', display: 'flex', ...style }}
    {...props}
  >
    {children}
  </button>
);

// 3. Action Button (The "Pill" - with pulse logic)
export const ActionButton = ({ children, variant = 'primary', style, ...props }) => {
  const isRecording = variant === 'secondary';
  return (
    <button style={{
      width: '100%',
      padding: '18px',
      borderRadius: '50px',
      border: 'none',
      fontSize: '1.1rem',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: isRecording ? '#ff4b2b' : 'white',
      color: isRecording ? 'white' : '#2e0249',
      boxShadow: isRecording ? '0 0 30px rgba(255, 75, 43, 0.5)' : '0 10px 20px rgba(0,0,0,0.2)',
      ...style
    }} {...props}>
      {children}
    </button>
  );
};

// 4. Button Group (The Layout Helper)
export const ButtonGroup = ({ children, vertical = false, style }) => (
  <div style={{
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    gap: '15px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...style
  }}>
    {children}
  </div>
);

// 5. Form Field
export const VocalInput = (props) => (
  <input 
    style={{
      width: '100%',
      boxSizing: 'border-box', // Ensures padding doesn't push the input out
      padding: '15px 20px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.61)', // Subtle border
      borderRadius: '12px',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      marginBottom: '5px',
      transition: 'all 0.3s ease',
      /* Focus state style to match the neon aesthetic */
    }} 
    onFocus={(e) => {
      e.target.style.border = '1px solid var(--lava-fuschia)';
      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
    }}
    onBlur={(e) => {
      e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
    }}
    {...props} 
  />
);

// 6. Labels
export const VocalLabel = ({ children, style }) => (
  <label style={{
    display: 'block',
    textAlign: 'left',
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '8px',
    marginLeft: '4px',
    ...style
  }}>
    {children}
  </label>
);

// 7. Selection List
export const VocalSelect = ({ options, onSelect, activeValue }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
    {options.map(opt => (
      <div 
        key={opt.value}
        onClick={() => onSelect(opt.value)}
        style={{
          padding: '15px 20px',
          background: activeValue === opt.value ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
          border: activeValue === opt.value ? '1px solid var(--lava-fuschia)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textAlign: 'left',
          color: 'white'
        }}
      >
        {opt.label}
      </div>
    ))}
  </div>
);

// 8. Typography
export const Title = ({ children, style }) => (
  <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '10px', ...style }}>
    {children}
  </h1>
);

export const SubTitle = ({ children, style }) => (
  <h2 style={{ fontSize: '1.2rem', fontWeight: '300', opacity: 0.7, marginBottom: '20px', ...style }}>
    {children}
  </h2>
);

export const BlockText = ({ children, style }) => (
  <p style={{ lineHeight: '1.6', opacity: 0.8, fontWeight: '300', ...style }}>
    {children}
  </p>
);

// 9. Vocal Checkbox (A standalone toggle with a glass look)
export const VocalCheckbox = ({ label, checked, onChange, style }) => (
  <div 
    onClick={() => onChange(!checked)}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '12px 20px',
      background: checked ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${checked ? 'var(--lava-fuschia)' : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ...style
    }}
  >
    <div style={{
      width: '20px',
      height: '20px',
      borderRadius: '4px',
      border: '2px solid white',
      background: checked ? 'var(--lava-fuschia)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      boxShadow: checked ? '0 0 10px var(--lava-fuschia)' : 'none'
    }}>
      {checked && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
    </div>
    <span style={{ color: 'white', fontWeight: '500', fontSize: '0.95rem' }}>{label}</span>
  </div>
);

// 10. Vocal MultiSelect (A grid/list container for multiple checkboxes)
export const VocalMultiSelect = ({ options, selectedValues, onChange, style }) => {
  const toggleOption = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr', 
      gap: '10px', 
      width: '100%',
      ...style 
    }}>
      {options.map(opt => (
        <VocalCheckbox 
          key={opt.value}
          label={opt.label}
          checked={selectedValues.includes(opt.value)}
          onChange={() => toggleOption(opt.value)}
        />
      ))}
    </div>
  );
};

// 11. Vocal Accordion (For category-based selection)
export const VocalAccordion = ({ title, selectedValue, options, onSelect, isOpen, onToggle }) => (
  <div style={{ width: '100%', marginBottom: '10px' }}>
    <NavBlade 
      onClick={onToggle} 
      /* Make sure the class is being injected here */
      className={`white-card ${isOpen ? 'is-open' : ''}`}
      style={{ 
        height: '70px', 
        justifyContent: 'space-between', 
        /* Remove the inline transform/transition hacks - let the CSS handle it */
        borderBottom: isOpen ? 'none' : undefined,
        borderRadius: isOpen ? '16px 16px 0 0' : '16px',
        marginBottom: 0,
        zIndex: 10,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', transform: 'skewX(15deg)' }}>
        <span style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</span>
        <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{selectedValue || "None Selected"}</span>
      </div>
      <span style={{ 
        transform: `skewX(15deg) rotate(${isOpen ? '90deg' : '0deg'})`, 
        transition: 'transform 0.3s ease',
        fontSize: '1.2rem'
      }}>›</span>
    </NavBlade>

    {/* The Expansion Tray */}
    <div style={{ 
  display: 'grid',
  gridTemplateRows: isOpen ? '1fr' : '0fr',
  transition: 'grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border-color 0.3s ease',
  overflow: 'hidden',
  
  /* Your fixed alignment numbers */
  marginLeft: '-9px', 
  width: '100%', 
  
  /* FIX 1: Only apply background when open to hide the "dark line" */
  background: isOpen ? 'rgba(0,0,0,0.4)' : 'transparent',
  
  borderRadius: '0 0 16px 16px',
  
  /* FIX 2: Explicitly manage the border so it doesn't leave a ghost line */
  border: isOpen 
    ? (selectedValue ? '1px solid var(--lava-fuschia)' : '1px solid rgba(255,255,255,0.1)') 
    : '1px solid transparent',
  
  borderTop: 'none',
  marginTop: '-1px',
  zIndex: 1,

  /* FIX 3: Hide visibility when closed so it doesn't capture clicks or render 1px lines */
  visibility: isOpen ? 'visible' : 'hidden'
}}>
  <div style={{ minHeight: 0 }}>
    <div style={{ padding: '20px' }}>
      <VocalSelect 
        options={options} 
        activeValue={selectedValue} 
        onSelect={(val) => { onSelect(val); onToggle(); }} 
      />
    </div>
  </div>
</div>
  </div>
);

export function IconButton({ children, onClick, title, style }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1.4rem',
        transition: 'all 0.2s',
        ...style // Allows you to pass custom styles to override defaults
      }}
    >
      {children}
    </button>
  );
}

export const InfoTag = ({ icon: Icon, label, value, color, onClick, style }) => (
  <GlassCard 
    onClick={onClick}
    style={{ 
      padding: '15px 20px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      flex: 1,
      minWidth: '150px',
      justifyContent: 'center',
      cursor: onClick ? 'pointer' : 'default',
      // We use a low-opacity version of the passed color for the glow effect
      background: color ? `${color}15` : 'rgba(255,255,255,0.05)',
      border: color ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.1)',
      transition: 'all 0.2s ease',
      ...style
    }}
  >
    {Icon && <Icon size={22} color={color || "rgba(255,255,255,0.3)"} />}
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white', lineHeight: '1.1' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.5, marginTop: '4px', letterSpacing: '0.5px' }}>
        {label}
      </div>
    </div>
  </GlassCard>
);