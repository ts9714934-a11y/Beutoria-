
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BeautyIndex } from '../../types';

interface ChartProps {
  data: BeautyIndex[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D7FF', '#FFC300', '#DAF7A6', '#C70039'];

const BeautyPieChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="score"
          nameKey="name"
          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "12px"}}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BeautyPieChart;
