import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LibraryView from './components/LibraryView';
import RoutineBuilder from './components/RoutineBuilder';
import GuidedExperience from './components/GuidedExperience'; // 1. Ensure this matches the file/function name
import RoutinePlayer from './components/RoutinePlayer';
import SinglePlayer from './components/SinglePlayer';
import RangeCalibration from './components/RangeCalibration'; // Import the new component

function App() {
  return (
    <Router>
      <Header /> 
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/library" element={<LibraryView />} />
        
        {/* ROUTINE PATHS */}
        <Route path="/routine/builder" element={<RoutineBuilder />} />
        <Route path="/routine/guided" element={<GuidedExperience />} />
        <Route path="/play" element={<RoutinePlayer />} />
         <Route path="/library/:category" element={<SinglePlayer />} />

        <Route path="/calibrate" element={<RangeCalibration />} />
      </Routes>
    </Router>
  );
}

export default App;