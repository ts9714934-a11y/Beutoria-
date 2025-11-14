import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4 overflow-hidden relative">
            {/* Original Sparkles */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={`sparkle-${i}`}
                    className="absolute text-2xl"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float 6s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 6}s`,
                    }}
                >
                    {['✨', '🟡', '💫'][i % 3]}
                </div>
            ))}
            
            {/* Snow */}
            {[...Array(15)].map((_, i) => (
                 <div
                    key={`snow-${i}`}
                    className="absolute text-xl"
                    style={{
                        top: '-10%',
                        left: `${Math.random() * 100}%`,
                        animation: `fall ${5 + Math.random() * 5}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                >
                    ❄️
                </div>
            ))}

            {/* Fur Particles */}
             {[...Array(15)].map((_, i) => (
                <div
                    key={`fur-${i}`}
                    className="absolute text-lg text-yellow-800"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `fur-float ${3 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 4}s`,
                    }}
                >
                    ∙
                </div>
            ))}


            {/* Panda Animation */}
            <div className="relative mb-8">
                 <div className="absolute inset-0 bg-yellow-400 blur-3xl rounded-full opacity-50"></div>
                <div className="text-8xl animate-bounce relative z-10">🐼</div>
            </div>

            <p className="text-lg font-semibold text-gray-700">
                Analyzing your Beauty Index… Please wait 💛✨
            </p>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
                    50% { transform: translateY(-30px) rotate(180deg); opacity: 0.5; }
                    100% { transform: translateY(0px) rotate(360deg); opacity: 1; }
                }
                 @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0.2; }
                }
                @keyframes fur-float {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
                    25% { transform: translate(15px, -15px) scale(1.1); }
                    50% { transform: translate(0, -25px) scale(1); opacity: 1; }
                    75% { transform: translate(-15px, -15px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
