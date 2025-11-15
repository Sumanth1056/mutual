
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { HistoricalDataPoint } from '../types';

interface FundChartProps {
  data: HistoricalDataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="font-bold">{`Date: ${label}`}</p>
        <p className="text-primary">{`NAV: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const FundChart: React.FC<FundChartProps> = ({ data }) => {
    const yDomain = [
        (dataMin: number) => (dataMin * 0.95).toFixed(0),
        (dataMax: number) => (dataMax * 1.05).toFixed(0),
    ];
    
  return (
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <defs>
                <linearGradient id="colorNav" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { year: '2-digit', month: 'short' })}/>
            <YAxis domain={yDomain} tick={{ fontSize: 12 }} tickFormatter={(tick) => `$${tick}`}/>
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="nav" stroke="#1e3a8a" strokeWidth={2} fillOpacity={1} fill="url(#colorNav)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
