import React, { useRef, useEffect, useState } from 'react';

interface CameraCaptureProps {
    onCapture: (dataUri: string) => void;
    onBack: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onBack }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const startCamera = async () => {
            try {
                // Ensure no previous stream is lingering
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }

                setError(null);
                if (isMounted) setIsCameraReady(false);
                
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } },
                    audio: false
                });
                
                if (isMounted) {
                    streamRef.current = mediaStream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                } else {
                    // if component unmounted while waiting for stream, clean up
                    mediaStream.getTracks().forEach(track => track.stop());
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                if (isMounted) {
                    setError("Could not access the camera. Please check permissions and try again.");
                }
            }
        };

        startCamera();

        return () => {
            isMounted = false;
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount and unmount

    const handleCapture = () => {
        if (isCameraReady && videoRef.current && canvasRef.current && streamRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                // Flip the image horizontally for a mirror effect to match the preview
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUri = canvas.toDataURL('image/jpeg');
                onCapture(dataUri);
                // The cleanup in useEffect will handle stopping the camera when the component unmounts
            }
        }
    };
    
    const handleBack = () => {
        // This will trigger the component to unmount, and the useEffect cleanup will stop the camera.
        onBack();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
            <div className="w-full max-w-lg relative">
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted // Muting is good practice for autoplay
                    onCanPlay={() => setIsCameraReady(true)}
                    className="w-full rounded-2xl shadow-lg aspect-square object-cover transform -scale-x-100" // Mirror the video feed for intuitive selfie experience
                />
                <canvas ref={canvasRef} className="hidden" />
                {!isCameraReady && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                        <p className="text-white text-lg animate-pulse">Starting camera...</p>
                    </div>
                )}
                {error && <p className="text-red-500 absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/80 p-2 rounded">{error}</p>}
            </div>
            <div className="mt-8 flex gap-4">
                 <button 
                    onClick={handleBack}
                    className="px-6 py-3 bg-gray-200 text-black font-semibold rounded-full shadow-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
                    Back
                </button>
                <button 
                    onClick={handleCapture} 
                    disabled={!isCameraReady}
                    className="px-8 py-3 bg-pink-400 text-white font-semibold rounded-full shadow-lg hover:bg-pink-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isCameraReady ? 'Capture Selfie' : 'Loading...'}
                </button>
            </div>
        </div>
    );
};

export default CameraCapture;
