
import React from 'react';
import type { MutualFund } from '../types';
import { FundChart } from './FundChart';
import { LoadingSpinner } from './LoadingSpinner';
import { PerformanceIndicator } from './PerformanceIndicator';

interface FundDetailProps {
  fund: MutualFund;
  onClose: () => void;
  onGenerateInsight: () => void;
  aiInsight: string;
  isGeneratingInsight: boolean;
  error: string;
}

const BackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

const renderInsight = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
        const lines = paragraph.split('\n').map((line, lineIndex) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={lineIndex} className="font-bold text-lg mt-4 mb-2 text-primary">{line.slice(2, -2)}</h4>;
            }
            return <React.Fragment key={lineIndex}>{line}<br/></React.Fragment>;
        });
        return <p key={index} className="mb-4 text-slate-700">{lines}</p>;
    });
};


export const FundDetail: React.FC<FundDetailProps> = ({ fund, onClose, onGenerateInsight, aiInsight, isGeneratingInsight, error }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl animate-fade-in">
      <button onClick={onClose} className="flex items-center text-secondary font-semibold mb-6 hover:underline">
        <BackIcon className="h-5 w-5 mr-2" />
        Back to all funds
      </button>

      <header className="mb-8">
        <p className="text-slate-500">{fund.fundHouse} • {fund.ticker}</p>
        <h1 className="text-4xl font-bold text-primary">{fund.name}</h1>
        <p className="text-lg bg-blue-100 text-blue-800 rounded-full px-4 py-1 inline-block mt-2">{fund.category}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-dark">Historical Performance (NAV)</h2>
            <div className="h-96 bg-slate-50 p-4 rounded-lg">
                <FundChart data={fund.historicalData} />
            </div>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-dark">AI-Powered Insights</h2>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
              {!aiInsight && !isGeneratingInsight && (
                 <div className="text-center">
                    <p className="text-slate-700 mb-4">Get a quick, AI-generated summary of this fund's strategy, performance, and risk profile.</p>
                    <button onClick={onGenerateInsight} className="bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary transition-colors flex items-center justify-center mx-auto">
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Generate AI Summary
                    </button>
                 </div>
              )}
              {isGeneratingInsight && (
                <div className="flex flex-col items-center justify-center h-40">
                    <LoadingSpinner />
                    <p className="mt-4 text-slate-600">Analyzing fund data...</p>
                </div>
              )}
              {error && <p className="text-danger text-center">{error}</p>}
              {aiInsight && <div className="prose max-w-none animate-fade-in">{renderInsight(aiInsight)}</div>}
            </div>
          </section>
        </div>

        <aside>
          <div className="bg-slate-50 p-6 rounded-lg sticky top-24">
            <h3 className="text-2xl font-semibold mb-4 text-dark">Fund Details</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-slate-600">Key Metrics</h4>
                    <div className="mt-2 space-y-2">
                        <PerformanceIndicator label="1Y Return" value={fund.returns.oneYear} />
                        <PerformanceIndicator label="3Y Return" value={fund.returns.threeYear} />
                        <PerformanceIndicator label="5Y Return" value={fund.returns.fiveYear} />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-600">Fund Info</h4>
                    <ul className="mt-2 text-sm space-y-2 text-slate-800">
                        <li><span className="font-semibold">AUM:</span> ${fund.aum} billion</li>
                        <li><span className="font-semibold">Expense Ratio:</span> {fund.expenseRatio}%</li>
                        <li><span className="font-semibold">Fund Manager:</span> {fund.fundManager}</li>
                        <li><span className="font-semibold">Inception:</span> {fund.inceptionDate}</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-600">Investment Strategy</h4>
                    <p className="mt-2 text-sm text-slate-800">{fund.strategy}</p>
                </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
