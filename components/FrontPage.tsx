
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
        <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white relative overflow-hidden">
            <div className="absolute top-10 left-10 text-4xl animate-pulse">✨</div>
            <div className="absolute top-20 right-20 text-4xl animate-pulse delay-500">🌸</div>
            <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-700">💛</div>
            <div className="absolute bottom-20 left-20 text-4xl animate-pulse delay-300">🎀</div>
            
            <div className="z-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
                    BEUTORIA
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                     AI Beauty Analyzer ✨
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Analyze your beauty profile across 10 scientific indexes. Upload a photo or take a selfie to begin 🌸📸
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleUploadClick}
                        className="px-8 py-3 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                    >
                        Upload Image
                    </button>
                    <button
                        onClick={onTakeSelfie}
                        className="px-8 py-3 bg-pink-400 text-white font-semibold rounded-full shadow-lg hover:bg-pink-500 transition-all duration-300 transform hover:scale-105"
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
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </main>
    );
};

export default FrontPage;
