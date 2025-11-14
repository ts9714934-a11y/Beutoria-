import React, { useState, useEffect, useRef } from 'react';
import type { MindMapNode } from '../types';

interface MindMapProps {
    title: string;
    nodes: MindMapNode[];
}

const colors = [
    'bg-yellow-200',
    'bg-pink-200',
    'bg-sky-200',
    'bg-orange-200',
    'bg-green-200',
];

const MindMap: React.FC<MindMapProps> = ({ title, nodes }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState(320); // Default size for mobile

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;
        
        // Use ResizeObserver to detect size changes of the container
        const observer = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width } = entries[0].contentRect;
                setSize(width);
            }
        });

        observer.observe(element);

        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, []);

    const radius = size / 2.6;
    const centerX = size / 2;
    const centerY = size / 2;

    const getNodePosition = (index: number) => {
        const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2; // Start from the top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return { x, y };
    };

    return (
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
            <div 
                ref={containerRef}
                className="relative mx-auto w-[320px] h-[320px] sm:w-[450px] sm:h-[450px]"
            >
                {/* SVG for drawing curved connecting lines */}
                <svg className="absolute top-0 left-0 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                    {nodes.map((_, index) => {
                        const { x, y } = getNodePosition(index);
                        const pathData = `M${centerX},${centerY} C${centerX},${centerY + (y - centerY)/2} ${centerX + (x - centerX)/2},${y} ${x},${y}`;
                        return (
                            <path
                                key={`line-${index}`}
                                d={pathData}
                                stroke="#9ca3af" // gray-400
                                strokeWidth="2"
                                fill="none"
                            />
                        );
                    })}
                </svg>

                {/* Mind Map Nodes */}
                {nodes.map((node, index) => {
                    const { x, y } = getNodePosition(index);
                    return (
                        <div
                            key={node.id}
                            className={`absolute p-4 rounded-2xl shadow-md ${colors[index % colors.length]} transform transition-transform hover:scale-110 flex items-center justify-center`}
                            style={{
                                top: `${y}px`,
                                left: `${x}px`,
                                transform: 'translate(-50%, -50%)', // Center the div on the calculated (x,y)
                                minWidth: '130px',
                                maxWidth: '150px',
                            }}
                        >
                            <p className="text-black font-bold text-center text-sm">
                                {node.text} {node.emoji}
                            </p>
                        </div>
                    );
                })}
                 
                 {/* Center Node */}
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full w-28 h-28 flex items-center justify-center text-center text-xs font-bold p-2 shadow-xl z-10"
                >
                   {title.split(' ')[0]}<br/>Focus
                </div>
            </div>
        </section>
    );
};

export default MindMap;