import React, { useRef } from 'react';

interface FrontPageProps {
    onFileUpload: (file: File) => void;
    onTakeSelfie: () => void;
    error: string | null;
}

const FrontPage: React.FC<FrontPageProps> = ({ onFileUpload, onTakeSelfie, error }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[#FFFBF7] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-rose-200 rounded-full opacity-30 blur-3xl animate-blob"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-sky-200 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-72 h-72 bg-yellow-200 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            
            <div className="z-10 bg-white/60 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl shadow-rose-100/50 border border-white/50">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-2 tracking-widest uppercase">
                    BEUTORIA
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-slate-700 mb-6">
                     AI Beauty Analyzer ✨
                </h2>
                <p className="text-slate-600 mb-10 max-w-md mx-auto">
                    Discover your unique beauty profile. Upload a photo or take a selfie to begin your journey. 🌸
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleUploadClick}
                        className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-full shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
                    >
                        Upload Image
                    </button>
                    <button
                        onClick={onTakeSelfie}
                        className="px-8 py-3 bg-rose-500 text-white font-semibold rounded-full shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-all duration-300 transform hover:scale-105"
                    >
                        Take a Selfie
                    </button>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
                {error && <p className="text-red-500 mt-6">{error}</p>}
            </div>
             <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </main>
    );
};

export default FrontPage;