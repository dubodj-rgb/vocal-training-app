import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ChevronLeft } from 'lucide-react'; // Added ChevronLeft
import { exerciseData } from '../data/exercises';
import { Title, IconButton } from './VocalUI'; // Imported IconButton

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. HARD EXIT: If we are on home, do not render ANYTHING.
  // This prevents the "ghosting" or lingering buttons during transitions.
  if (location.pathname === "/") {
    return null; 
  }

  const pathParts = location.pathname.split('/').filter(Boolean);

  // Title Logic
  let pageTitle = "";
  if (location.pathname === "/routine/guided") {
    pageTitle = "Guided Startup";
  } else if (location.pathname === "/routine/builder") {
    pageTitle = "Routine Builder";
  } else if (location.pathname === "/library") {
    pageTitle = "Exercise Library";
  } else if (location.pathname === "/play") {
    try {
      const stored = JSON.parse(localStorage.getItem('vocalRoutines') || '[]');
      const currentRoutine = stored[stored.length - 1];
      pageTitle = currentRoutine ? currentRoutine.name : "Routine Player";
    } catch (e) {
      pageTitle = "Routine Player";
    }
  } else if (pathParts[0] === 'library' && pathParts[1] && exerciseData[pathParts[1]]) {
    pageTitle = exerciseData[pathParts[1]].title;
  }

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px',
      background: 'rgba(255, 255, 255, 0.03)', 
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      color: 'white'
      // removed visibility logic here as the null return handles it
    }}>
      
      {/* Left Area: Back Button */}
      <div style={{ width: '80px' }}>
        <IconButton onClick={() => navigate(-1)} title="Go Back">
          <ChevronLeft size={24} />
        </IconButton>
      </div>

      {/* Center Area: Dynamic Title */}
      <Title style={{ 
        margin: 0, 
        fontSize: '0.75rem', 
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        opacity: 0.8,
        flexGrow: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: '0 10px'
      }}>
        {pageTitle}
      </Title>

      {/* Right Area: Home Button */}
      <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={() => navigate('/')} title="Return to Dashboard">
          <Home size={18} />
        </IconButton>
      </div>
      
    </header>
  );
}