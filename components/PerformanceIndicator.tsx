
import React from 'react';

interface PerformanceIndicatorProps {
  label: string;
  value: number;
}

const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
  </svg>
);

const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
    </svg>
);


export const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({ label, value }) => {
  const isPositive = value >= 0;
  const colorClass = isPositive ? 'text-accent' : 'text-danger';
  const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <div className={`flex items-center font-bold ${colorClass}`}>
        <Icon className="h-4 w-4 mr-1" />
        <span>{value.toFixed(2)}%</span>
      </div>
    </div>
  );
};
