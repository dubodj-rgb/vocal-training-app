import { useEffect, useRef } from 'react';

// Make sure it says "export default function"
export default function CameraFeed() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    startCamera();
    
    // Cleanup: Stop the camera when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <video 
      ref={videoRef} 
      autoPlay 
      playsInline 
      muted 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '15px',
        transform: 'scaleX(-1)',
        background: '#222'
      }}
    />
  );
}