import React, { useState, useEffect, useRef } from 'react';
import type { MindMapNode } from '../types';

interface MindMapProps {
    title: string;
    nodes: MindMapNode[];
}

const colors = [
    'bg-rose-100',
    'bg-sky-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-purple-100',
];

const MindMap: React.FC<MindMapProps> = ({ title, nodes }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState(320);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;
        
        const observer = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width } = entries[0].contentRect;
                setSize(width);
            }
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const radius = size / 2.6;
    const centerX = size / 2;
    const centerY = size / 2;

    const getNodePosition = (index: number) => {
        const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return { x, y };
    };

    return (
        <section className="bg-white p-6 rounded-2xl shadow-xl shadow-rose-100/50 mb-8 border border-rose-50/50">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">{title}</h2>
            <div 
                ref={containerRef}
                className="relative mx-auto w-[320px] h-[320px] sm:w-[450px] sm:h-[450px]"
            >
                <svg className="absolute top-0 left-0 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                    {nodes.map((_, index) => {
                        const { x, y } = getNodePosition(index);
                        const pathData = `M${centerX},${centerY} Q${centerX + (x - centerX) * 0.5},${centerY + (y - centerY) * 0.5} ${x},${y}`;
                        return (
                            <path
                                key={`line-${index}`}
                                d={pathData}
                                stroke="#e2e8f0"
                                strokeWidth="2"
                                fill="none"
                            />
                        );
                    })}
                </svg>

                {nodes.map((node, index) => {
                    const { x, y } = getNodePosition(index);
                    return (
                        <div
                            key={node.id}
                            className={`absolute p-4 rounded-xl shadow-md ${colors[index % colors.length]} transform transition-transform hover:scale-110 flex items-center justify-center`}
                            style={{
                                top: `${y}px`,
                                left: `${x}px`,
                                transform: 'translate(-50%, -50%)',
                                minWidth: '130px',
                                maxWidth: '150px',
                            }}
                        >
                            <p className="text-slate-800 font-semibold text-center text-sm">
                                {node.text} {node.emoji}
                            </p>
                        </div>
                    );
                })}
                 
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white rounded-full w-28 h-28 flex items-center justify-center text-center text-sm font-bold p-2 shadow-xl z-10"
                >
                   {title.split(' ')[0]}<br/>Focus
                </div>
            </div>
        </section>
    );
};

export default MindMap;