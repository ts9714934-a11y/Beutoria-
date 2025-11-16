import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF7] text-center p-4 overflow-hidden">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Pulsing circles */}
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute border-2 border-rose-300 rounded-full"
                        style={{
                            width: `${(i + 1) * 4}rem`,
                            height: `${(i + 1) * 4}rem`,
                            animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                            animationDelay: `${i * 300}ms`,
                        }}
                    ></div>
                ))}
                {/* Center Logo/Icon */}
                <div className="text-5xl text-rose-500 animate-fade-in">
                    🌸
                </div>
            </div>

            <p className="text-lg font-semibold text-slate-700 mt-12 tracking-wide">
                Analyzing your unique beauty profile…
            </p>
            <p className="text-sm text-slate-500">
                Please wait a moment. ✨
            </p>

            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                }
                @keyframes fade-in {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 1.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;