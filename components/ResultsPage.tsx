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
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-rose-100/50 mb-8 border border-rose-50/50 animate-float-subtle">
        <h3 className="text-xl font-bold text-center mb-4 text-slate-800">{title}</h3>
        <div className="w-full h-80">{children}</div>
    </div>
);

const HighlightedText: React.FC<{ text: string; keywords: string[] }> = ({ text, keywords }) => {
    if (!keywords.length) return <>{text}</>;

    const regex = new RegExp(`(${keywords.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
    
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
                    <strong key={index} className="font-bold text-rose-500">
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
        <div className="bg-[#FFFBF7] min-h-screen relative overflow-x-hidden">
             <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`mote-${i}`}
                        className="absolute bg-rose-200 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3}px`,
                            height: `${Math.random() * 3}px`,
                            opacity: Math.random() * 0.5 + 0.1,
                            animation: `drift ${10 + Math.random() * 20}s linear infinite`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    ></div>
                ))}
            </div>

            <style>{`
                @keyframes float-subtle {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float-subtle {
                    animation: float-subtle 4s ease-in-out infinite;
                }
                @keyframes drift {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    100% { transform: translate(-100px, 150px) rotate(360deg); }
                }
            `}</style>
             <header className="sticky top-0 bg-white/70 backdrop-blur-md z-50 p-4 border-b border-rose-100/80 flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Your Beutoria Analysis 🎀</h1>
                <button onClick={onBack} className="px-6 py-2 bg-slate-900 text-white font-semibold rounded-full shadow-md shadow-slate-900/20 hover:bg-slate-800 transition-colors">
                    Start Over
                </button>
            </header>
            <main className="p-4 md:p-8 max-w-4xl mx-auto relative z-10">
               
                <section className="mb-12">
                    <ChartCard title="Beauty Index Overview 📊">
                        <BeautyBarChart data={beautyIndexes} />
                    </ChartCard>
                     <ChartCard title="Performance Analysis 🎯">
                        <BeautyRadarChart data={beautyIndexes} />
                    </ChartCard>
                    <ChartCard title="Index Trends 📈">
                         <BeautyLineChart data={beautyIndexes} />
                    </ChartCard>
                    <ChartCard title="Score Distribution 🥧">
                        <BeautyPieChart data={beautyIndexes} />
                    </ChartCard>
                    <ChartCard title="Overall Score Flow 🌊">
                        <BeautyAreaChart data={beautyIndexes} />
                    </ChartCard>
                     <ChartCard title="Index Correlation ✨">
                        <BeautyScatterPlot data={beautyIndexes} />
                    </ChartCard>
                    <ChartCard title="Index Importance 🌳">
                        <BeautyTreeMap data={beautyIndexes} />
                    </ChartCard>
                </section>
                
                <MindMap title="Key Focus Areas 🧐" nodes={problems} />
                <MindMap title="Personalized Solutions 💡" nodes={solutions} />

                <section className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl shadow-rose-100/50 border border-rose-50/50 mt-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-slate-800">In-Depth Analysis 📜</h2>
                    <div className="p-4 sm:p-6 space-y-12 text-slate-700 leading-relaxed bg-rose-50/30 rounded-xl">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-rose-500">Introduction 🌸</h3>
                            <p className="text-lg">
                                <HighlightedText text={detailedAnalysis.introduction} keywords={keywords} />
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-rose-500">Your Strengths 💪✨</h3>
                            <ul className="list-disc list-inside space-y-3 text-lg">
                                {detailedAnalysis.strengths.map((item, index) => <li key={index}><HighlightedText text={item} keywords={keywords} /></li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-rose-500">Areas for Enhancement 💛</h3>
                             <ul className="list-disc list-inside space-y-3 text-lg">
                                {detailedAnalysis.weaknesses.map((item, index) => <li key={index}><HighlightedText text={item} keywords={keywords} /></li>)}
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-rose-500">Personalized Suggestions ✍️</h3>
                            <p className="text-lg">
                                <HighlightedText text={detailedAnalysis.suggestions} keywords={keywords} />
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-rose-500">Final Thoughts 💎</h3>
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