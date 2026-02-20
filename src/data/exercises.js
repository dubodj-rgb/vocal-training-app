// 1. Asset Imports
import lipTrillAudio from '../assets/recordings/lip_trills_five_note_slide.m4a';
// import sovtStaffImg from '../assets/visuals/sovt_staff.png';

export const exerciseData = {
  
  // ==========================================
  // SOVT / FLOW (Audio Only)
  // ==========================================
  "sovt-liptrill": {
    title: "Lip Trill - Five Note Slide",
    audioSrc: lipTrillAudio, // The only one wired up right now
    uiType: "audio-only",
    description: "Lip trill on a {B} on this five note slide.",
    targetNote: "B4", 
    targetFreq: 493.88, 
    staffPosition: 50,
    victoryScore: 75, 
    feedback: { perfect: "Excellent! You nailed the pitch.", good: "Great job! You're very close.", tryAgain: "Keep going! Try to keep your air steady." }
  },
  "sovt-straw": {
    title: "Straw Phonation",
    audioSrc: null,
    uiType: "audio-only",
    description: "Hum scales through a straw to create back pressure.",
    targetNote: "G4", targetFreq: 392.00, staffPosition: 40, victoryScore: 75,
    feedback: { perfect: "Perfect airflow.", good: "Good, keep it steady.", tryAgain: "Don't push too hard." }
  },
  "sovt-tonguetrills": {
    title: "Tongue Trills",
    audioSrc: null, uiType: "audio-only",
    description: "Rolled 'R' sounds on ascending and descending arpeggios.",
    targetNote: "C4", targetFreq: 261.63, staffPosition: 30, victoryScore: 75,
    feedback: { perfect: "Great roll!", good: "Keep the tongue relaxed.", tryAgain: "Use more air if the trill stops." }
  },
  "sovt-raspberries": {
    title: "Raspberries",
    audioSrc: null, uiType: "audio-only",
    description: "Trill with the tongue out between the lips to release root tension.",
    targetNote: "A3", targetFreq: 220.00, staffPosition: 20, victoryScore: 75,
    feedback: { perfect: "Very relaxed.", good: "Good vibration.", tryAgain: "Let the tongue rest further out." }
  },
  "sovt-fricatives": {
    title: "Voiced Fricatives",
    audioSrc: null, uiType: "audio-only",
    description: "Sustain 'V', 'Z', or 'Th' sounds while gliding pitch.",
    targetNote: "E4", targetFreq: 329.63, staffPosition: 35, victoryScore: 75,
    feedback: { perfect: "Smooth glide.", good: "Keep the buzz strong.", tryAgain: "Don't let the sound become breathy." }
  },
  "sovt-puffycheeks": {
    title: "Puffy Cheeks",
    audioSrc: null, uiType: "audio-only",
    description: "Sing a 'U' vowel with puffed cheeks and a tiny lip opening.",
    targetNote: "D4", targetFreq: 293.66, staffPosition: 32, victoryScore: 75,
    feedback: { perfect: "Great back pressure.", good: "Keep the cheeks inflated.", tryAgain: "Make the lip opening smaller." }
  },

  // ==========================================
  // BREATHING (Video Demo / Timer)
  // ==========================================
  "breathing-farinelli": {
    title: "Farinelli Breathing",
    audioSrc: null, uiType: "video-demo",
    description: "Inhale for 4, hold for 4, exhale for 4. Keep ribs expanded.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 90, 
    feedback: { perfect: "Perfect lung control!", good: "Good rhythm.", tryAgain: "Focus on expanding lower ribs." }
  },
  "breathing-hiss": {
    title: "The Hiss (Sibilant)",
    audioSrc: null, uiType: "video-demo",
    description: "A long, steady 'S' sound on a single breath to build stamina.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 90,
    feedback: { perfect: "Incredibly steady.", good: "Good duration.", tryAgain: "Keep the hiss consistent in volume." }
  },
  "breathing-bouncy": {
    title: "Bouncy Breath (Sh/T)",
    audioSrc: null, uiType: "video-demo",
    description: "Short, rhythmic 'Sh' or 'T' sounds to engage the abdominal wall.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 90,
    feedback: { perfect: "Great core engagement.", good: "Nice rhythm.", tryAgain: "Make the pulses sharper." }
  },
  "breathing-yawn": {
    title: "Yawn-Sigh",
    audioSrc: null, uiType: "video-demo",
    description: "Deep, silent yawn inhale followed by a relaxed, voiced sigh.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 90,
    feedback: { perfect: "Very relaxed space.", good: "Good sigh.", tryAgain: "Lift the soft palate more on the inhale." }
  },
  "breathing-ribcage": {
    title: "Rib Cage Expansion",
    audioSrc: null, uiType: "video-demo",
    description: "Deep inhales holding a 'belt' position around the lower ribs.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 90,
    feedback: { perfect: "Excellent expansion.", good: "Good stretch.", tryAgain: "Try not to raise your shoulders." }
  },

  // ==========================================
  // STRETCHES & MASSAGE (Video Demo)
  // ==========================================
  "stretches-jaw": {
    title: "Jaw Release (Masseter Massage)",
    audioSrc: null, uiType: "video-demo",
    description: "Gently massage the masseter muscle while humming a low tone.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 60, 
    feedback: { perfect: "Maximum relaxation.", good: "Feeling looser?", tryAgain: "Don't press too hard." }
  },
  "stretches-laryngeal": {
    title: "Laryngeal Side-to-Side",
    audioSrc: null, uiType: "video-demo",
    description: "Gently moving the larynx horizontally to ensure mobility.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 60,
    feedback: { perfect: "Nice and loose.", good: "Gentle movement.", tryAgain: "Only use very light pressure." }
  },
  "stretches-suboccipital": {
    title: "Sub-Occipital Release",
    audioSrc: null, uiType: "video-demo",
    description: "Dropping the chin to the chest to stretch the base of the skull.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 60,
    feedback: { perfect: "Great stretch.", good: "Keep breathing.", tryAgain: "Don't force the neck down." }
  },
  "stretches-tongueroot": {
    title: "Tongue Root Release",
    audioSrc: null, uiType: "video-demo",
    description: "Massaging the soft area under the chin with thumbs while humming.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 60,
    feedback: { perfect: "Root is soft.", good: "Keep the hum light.", tryAgain: "If it's hard, the tongue is tense." }
  },
  "stretches-scm": {
    title: "SCM Stretch",
    audioSrc: null, uiType: "video-demo",
    description: "Tilting the ear to the shoulder and looking down into the opposite armpit.",
    targetNote: null, targetFreq: 0, staffPosition: 0, victoryScore: 60,
    feedback: { perfect: "Perfect angle.", good: "Hold it there.", tryAgain: "Drop the opposite shoulder to deepen it." }
  },

  // ==========================================
  // AGILITY (Pitch Match)
  // ==========================================
  "agility-majorarp": {
    title: "Major Arpeggios (Yee/La)",
    audioSrc: null, uiType: "pitch-match",
    description: "Move quickly through 1-3-5-8-5-3-1 on a 'Yee' vowel.",
    targetNote: "G4", targetFreq: 392.00, staffPosition: 40, victoryScore: 85, 
    feedback: { perfect: "Superb agility!", good: "Nice speed!", tryAgain: "Slow down to lock the pitch." }
  },
  "agility-9note": {
    title: "The 9-Note Scale",
    audioSrc: null, uiType: "pitch-match",
    description: "Rapidly ascending and descending a full major scale plus one note.",
    targetNote: "C5", targetFreq: 523.25, staffPosition: 60, victoryScore: 85,
    feedback: { perfect: "Clean runs!", good: "Good pacing.", tryAgain: "Don't slide between notes." }
  },
  "agility-staccato": {
    title: "Staccato Hops",
    audioSrc: null, uiType: "pitch-match",
    description: "Short, detached notes on 1-3-5-3-1 to work on glottal precision.",
    targetNote: "E4", targetFreq: 329.63, staffPosition: 35, victoryScore: 85,
    feedback: { perfect: "Very crisp.", good: "Clean attacks.", tryAgain: "Use the breath, not the throat, to stop the sound." }
  },
  "agility-sweeping": {
    title: "Sweeping Patterns",
    audioSrc: null, uiType: "pitch-match",
    description: "Wide-range slides (octave plus a fifth) to practice register blending.",
    targetNote: "A4", targetFreq: 440.00, staffPosition: 45, victoryScore: 85,
    feedback: { perfect: "Seamless transition.", good: "Good mix.", tryAgain: "Don't flip, let the voice thin out naturally." }
  },
  "agility-solfege": {
    title: "Solfege Sprints",
    audioSrc: null, uiType: "pitch-match",
    description: "Singing 'Do-Re-Mi-Fa-Sol' and back at increasing speeds.",
    targetNote: "F4", targetFreq: 349.23, staffPosition: 38, victoryScore: 85,
    feedback: { perfect: "Excellent articulation.", good: "Fast and clean.", tryAgain: "Keep the jaw still while singing." }
  },

  // ==========================================
  // VOWEL TRAINING (Pitch Match)
  // ==========================================
  "vowel-matching": {
    title: "Vowel Matching (Ah-Eh-Ee-Oh-Oo)",
    audioSrc: null, uiType: "pitch-match",
    description: "Changing vowels on a single sustained pitch without losing resonance.",
    targetNote: "A4", targetFreq: 440.00, staffPosition: 45, victoryScore: 80, 
    feedback: { perfect: "Flawless formant transition.", good: "Great resonance.", tryAgain: "Keep the back space consistent." }
  },
  "vowel-resonator": {
    title: "Resonator Matching (NG to Ah)",
    audioSrc: null, uiType: "pitch-match",
    description: "Transitioning from a nasal 'NG' sound directly into an open 'Ah'.",
    targetNote: "B4", targetFreq: 493.88, staffPosition: 50, victoryScore: 80,
    feedback: { perfect: "Perfect placement.", good: "Nice forward sound.", tryAgain: "Don't let the 'Ah' fall backwards." }
  },
  "vowel-messa": {
    title: "Messa di Voce",
    audioSrc: null, uiType: "pitch-match",
    description: "Sustain a vowel while starting softly, getting loud, and returning to soft.",
    targetNote: "C4", targetFreq: 261.63, staffPosition: 30, victoryScore: 80,
    feedback: { perfect: "Incredible dynamic control.", good: "Smooth swell.", tryAgain: "Don't let the pitch go flat when getting louder." }
  },
  "vowel-shifts": {
    title: "Vowel Shifts (Ee to Ah)",
    audioSrc: null, uiType: "pitch-match",
    description: "Rapidly alternating between 'Ee' and 'Ah' to practice tongue positioning.",
    targetNote: "D4", targetFreq: 293.66, staffPosition: 32, victoryScore: 80,
    feedback: { perfect: "Tongue is very independent.", good: "Clean shifts.", tryAgain: "Keep the jaw still, just move the tongue." }
  },
  "vowel-speaky": {
    title: "Speaky Quality (Yo-Yo-Yo)",
    audioSrc: null, uiType: "pitch-match",
    description: "Singing 'Yo-Yo-Yo' to find a forward, resonant 'mask' placement.",
    targetNote: "E4", targetFreq: 329.63, staffPosition: 35, victoryScore: 80,
    feedback: { perfect: "Great ping!", good: "Very forward.", tryAgain: "Aim the sound right behind the nose." }
  },

  // ==========================================
  // EAR TRAINING (Pitch Match)
  // ==========================================
  "ear-perfect5th": {
    title: "Perfect Fifth Intervals",
    audioSrc: null, uiType: "pitch-match",
    description: "Listen to the root, then sing the perfect fifth above it.",
    targetNote: "E4", targetFreq: 329.63, staffPosition: 60, victoryScore: 95, 
    feedback: { perfect: "Your ear is spot on!", good: "Very close.", tryAgain: "Visualize the interval before singing." }
  },
  "ear-majorminor": {
    title: "Major vs. Minor Thirds",
    audioSrc: null, uiType: "pitch-match",
    description: "Alternating between a bright (major) and dark (minor) third.",
    targetNote: "E4", targetFreq: 329.63, staffPosition: 35, victoryScore: 95,
    feedback: { perfect: "Great intonation.", good: "Clear difference.", tryAgain: "Make sure the minor third is flat enough." }
  },
  "ear-siren": {
    title: "Siren Slides",
    audioSrc: null, uiType: "pitch-match",
    description: "Matching a moving pitch precisely throughout a full range glide.",
    targetNote: "G4", targetFreq: 392.00, staffPosition: 40, victoryScore: 95,
    feedback: { perfect: "Locked on target.", good: "Smooth tracking.", tryAgain: "Don't jump ahead of the reference audio." }
  },
  "ear-chromatic": {
    title: "Chromatic Steps",
    audioSrc: null, uiType: "pitch-match",
    description: "Singing small half-steps to refine pitch centering.",
    targetNote: "C#4", targetFreq: 277.18, staffPosition: 31, victoryScore: 95,
    feedback: { perfect: "Micro-tuning is perfect.", good: "Good separation.", tryAgain: "Don't make the steps too wide." }
  },
  "ear-jumps": {
    title: "Interval Jumps (Octave/7th)",
    audioSrc: null, uiType: "pitch-match",
    description: "Moving from a root to an octave or a seventh to practice hearing distance.",
    targetNote: "C5", targetFreq: 523.25, staffPosition: 60, victoryScore: 95,
    feedback: { perfect: "Nailed the landing.", good: "Good pitch memory.", tryAgain: "Support the top note with more breath." }
  }
};