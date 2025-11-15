
import React from 'react';
import type { MutualFund } from '../types';
import { PerformanceIndicator } from './PerformanceIndicator';

interface FundCardProps {
  fund: MutualFund;
  onSelect: () => void;
}

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);


export const FundCard: React.FC<FundCardProps> = ({ fund, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        <p className="text-sm text-gray-500">{fund.fundHouse}</p>
        <h3 className="text-xl font-bold text-primary mb-2">{fund.name}</h3>
        <p className="text-sm bg-blue-100 text-blue-800 rounded-full px-3 py-1 inline-block mb-4">{fund.category}</p>

        <div className="space-y-3">
          <PerformanceIndicator label="1Y Return" value={fund.returns.oneYear} />
          <PerformanceIndicator label="5Y Return" value={fund.returns.fiveYear} />
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
            <p><span className="font-semibold">AUM:</span> ${fund.aum}B</p>
            <p><span className="font-semibold">Expense Ratio:</span> {fund.expenseRatio}%</p>
        </div>
      </div>
      <div className="bg-gray-50 p-4 mt-auto">
        <button
          onClick={onSelect}
          className="w-full text-primary font-semibold py-2 px-4 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center group"
        >
          View Details
          <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
