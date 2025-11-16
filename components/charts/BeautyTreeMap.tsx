import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import type { BeautyIndex } from '../../types';

interface ChartProps {
  data: BeautyIndex[];
}

const COLORS = ['#fb7185', '#fda4af', '#60a5fa', '#93c5fd', '#facc15', '#fde047'];

const CustomizedContent: React.FC<any> = ({ root, depth, x, y, width, height, index, colors, name }) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[index % colors.length],
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {width > 80 && height > 25 ? (
        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={14}>
          {name}
        </text>
      ) : null}
    </g>
  );
};

const BeautyTreeMap: React.FC<ChartProps> = ({ data }) => {
  const treeData = data.map(item => ({...item, size: item.score}))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={treeData}
        dataKey="size"
        ratio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS} />}
      >
         <Tooltip formatter={(value: number, name: string) => [`${value}`, name]} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default BeautyTreeMap;