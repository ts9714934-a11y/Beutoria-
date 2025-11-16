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
    }, []);

    const handleCapture = () => {
        if (isCameraReady && videoRef.current && canvasRef.current && streamRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUri = canvas.toDataURL('image/jpeg');
                onCapture(dataUri);
            }
        }
    };
    
    const handleBack = () => {
        onBack();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#FFFBF7]">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Ready for your close-up?</h2>
            <div className="w-full max-w-lg relative">
                <div className="absolute inset-0 rounded-3xl shadow-2xl shadow-rose-200/50 border-4 border-white transform scale-105"></div>
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    onCanPlay={() => setIsCameraReady(true)}
                    className="w-full rounded-2xl shadow-lg aspect-square object-cover transform -scale-x-100 relative z-10"
                />
                <canvas ref={canvasRef} className="hidden" />
                {!isCameraReady && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl z-20">
                        <p className="text-white text-lg animate-pulse">Starting camera...</p>
                    </div>
                )}
                {error && <p className="text-red-500 absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white/80 p-3 rounded-lg shadow-md">{error}</p>}
            </div>
            <div className="mt-12 flex gap-4">
                 <button 
                    onClick={handleBack}
                    className="px-8 py-3 bg-white text-slate-800 font-semibold rounded-full shadow-lg border border-slate-200 hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
                    Back
                </button>
                <button 
                    onClick={handleCapture} 
                    disabled={!isCameraReady}
                    className="px-8 py-3 bg-rose-500 text-white font-semibold rounded-full shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-400 disabled:shadow-none disabled:cursor-not-allowed">
                    {isCameraReady ? 'Capture Selfie' : 'Loading...'}
                </button>
            </div>
        </div>
    );
};

export default CameraCapture;