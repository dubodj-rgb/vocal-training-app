import PitchMatchPlayer from './PitchMatchPlayer';
import StandardAudioPlayer from './StandardAudioPlayer';
import VideoDemoPlayer from './VideoDemoPlayer';

export default function VocalPlayer({ exercise }) {
  if (!exercise) return null;

  switch (exercise.uiType) {
    case 'pitch-match':
      return <PitchMatchPlayer exercise={exercise} />;
    case 'audio-only':
      return <StandardAudioPlayer exercise={exercise} />;
    case 'video-demo':
      return <VideoDemoPlayer exercise={exercise} />;
    default:
      return <StandardAudioPlayer exercise={exercise} />;
  }
}