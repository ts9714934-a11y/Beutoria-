import React from 'react';
import type { AnalysisResult } from '../types';
import MindMap from './MindMap';
import BeautyBarChart from './charts/BeautyBarChart';
import BeautyLineChart from './charts/BeautyLineChart';
import BeautyPieChart from './charts/BeautyPieChart';
import BeautyRadarChart from './charts/BeautyRadarChart';
import BeautyAreaChart from './charts/BeautyAreaChart';
import BeautyScatterPlot from './charts/BeautyScatterPlot';
import BeautyTreeMap from './charts/BeautyTreeMap';

interface ResultsPageProps {
    result: AnalysisResult;
    onBack: () => void;
}

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100 animate-float-subtle">
        <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
        <div className="w-full h-80">{children}</div>
    </div>
);

// Helper component to find and highlight keywords in a text
const HighlightedText: React.FC<{ text: string; keywords: string[] }> = ({ text, keywords }) => {
    if (!keywords.length) return <>{text}</>;

    // Escape special characters for regex and create a single pattern
    const regex = new RegExp(`(${keywords.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
    
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
                    <strong key={index} className="font-bold text-black text-[1.1em]">
                        {part}
                    </strong>
                ) : (
                    part
                )
            )}
        </>
    );
};


const ResultsPage: React.FC<ResultsPageProps> = ({ result, onBack }) => {
    const { beautyIndexes, problems, solutions, detailedAnalysis } = result;
    const keywords = React.useMemo(() => beautyIndexes.map(bi => bi.name), [beautyIndexes]);

    return (
        <div className="bg-white min-h-screen relative overflow-hidden">
            <div className="fixed top-0 left-0 h-full w-1/2 pointer-events-none z-50 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`snow-${i}`}
                        className="absolute text-white"
                        style={{
                            top: '-10%',
                            left: `${Math.random() * 100}%`,
                            fontSize: `${1 + Math.random()}rem`,
                            opacity: Math.random() * 0.5 + 0.2,
                            animation: `fall ${10 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    >
                        ❄️
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes float-subtle {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float-subtle {
                    animation: float-subtle 4s ease-in-out infinite;
                }
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); }
                    100% { transform: translateY(105vh) rotate(360deg); }
                }
            `}</style>
             <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold">Your Beutoria Analysis 🎀</h1>
                <button onClick={onBack} className="px-6 py-2 bg-black text-white font-semibold rounded-full shadow-md hover:bg-gray-800 transition-colors">
                    Start Over
                </button>
            </header>
            <main className="p-4 md:p-8 max-w-4xl mx-auto relative z-10">
               
                <section className="mb-12">
                    <ChartCard title="Beauty Index Overview 📊 (Bar Chart)">
                        <BeautyBarChart data={beautyIndexes} />
                    </ChartCard>
                    <ChartCard title="Index Trends 📈 (Line Chart)">
                         <BeautyLineChart data={beautyIndexes} />
                    </ChartCard>
                    <ChartCard title="Score Distribution 🥧 (Pie Chart)">
                        <BeautyPieChart data={beautyIndexes} />
                    </ChartCard>
                     <ChartCard title="Performance Analysis 🎯 (Radar Chart)">
                        <BeautyRadarChart data={beautyIndexes} />
                    </ChartCard>
                    <ChartCard title="Overall Score Flow 🌊 (Area Chart)">
                        <BeautyAreaChart data={beautyIndexes} />
                    </ChartCard>
                     <ChartCard title="Index Correlation ✨ (Scatter Plot)">
                        <BeautyScatterPlot data={beautyIndexes} />
                    </ChartCard>
                    <ChartCard title="Index Importance 🌳 (Tree Map)">
                        <BeautyTreeMap data={beautyIndexes} />
                    </ChartCard>
                </section>
                
                <MindMap title="Areas to Focus On 🧐" nodes={problems} />
                <MindMap title="Recommended Improvements 💡✨" nodes={solutions} />

                <section className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">In-Depth Analysis 📜</h2>
                    <div className="p-4 sm:p-6 space-y-16 text-gray-700 leading-relaxed bg-gray-50/50 rounded-xl">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-pink-500">Introduction 🌸</h3>
                            <p className="text-lg">
                                <HighlightedText text={detailedAnalysis.introduction} keywords={keywords} />
                            </p>
                        </div>
                        <div>
                            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-green-500">Your Strengths 💪✨</h3>
                            <ul className="list-disc list-inside space-y-3 text-lg">
                                {detailedAnalysis.strengths.map((item, index) => <li key={index}><HighlightedText text={item} keywords={keywords} /></li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-yellow-500">Areas for Enhancement 💛</h3>
                             <ul className="list-disc list-inside space-y-3 text-lg">
                                {detailedAnalysis.weaknesses.map((item, index) => <li key={index}><HighlightedText text={item} keywords={keywords} /></li>)}
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-blue-500">Personalized Suggestions ✍️</h3>
                            <p className="text-lg">
                                <HighlightedText text={detailedAnalysis.suggestions} keywords={keywords} />
                            </p>
                        </div>
                        <div>
                            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-purple-500">Final Thoughts 💎</h3>
                            <p className="text-lg">
                                <HighlightedText text={detailedAnalysis.conclusion} keywords={keywords} />
                            </p>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default ResultsPage;
