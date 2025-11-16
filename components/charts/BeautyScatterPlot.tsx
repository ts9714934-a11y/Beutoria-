import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import type { BeautyIndex } from '../../types';

interface ChartProps {
  data: BeautyIndex[];
}

const BeautyScatterPlot: React.FC<ChartProps> = ({ data }) => {
  const plotData = data.map((item, index) => ({ ...item, x: index + 1, y: item.score }));
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Index" unit="" tick={{ fontSize: 10 }} />
        <YAxis type="number" dataKey="y" name="Score" unit="" />
        <ZAxis dataKey="name" name="name" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Beauty Indexes" data={plotData} fill="#fb7185" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default BeautyScatterPlot;