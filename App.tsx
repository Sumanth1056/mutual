
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { FundCard } from './components/FundCard';
import { FundDetail } from './components/FundDetail';
import { SearchBar } from './components/SearchBar';
import { getMockFunds } from './services/fundService';
import type { MutualFund } from './types';
import { getFundInsight } from './services/geminiService';

const App: React.FC = () => {
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setFunds(getMockFunds());
  }, []);

  const filteredFunds = useMemo(() => {
    return funds.filter(fund =>
      fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.fundHouse.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [funds, searchTerm]);

  const handleSelectFund = (fund: MutualFund) => {
    setSelectedFund(fund);
    setAiInsight('');
    setError('');
  };

  const handleCloseDetail = () => {
    setSelectedFund(null);
  };

  const handleGenerateInsight = async () => {
    if (!selectedFund) return;
    setIsGeneratingInsight(true);
    setAiInsight('');
    setError('');
    try {
      const insight = await getFundInsight(selectedFund);
      setAiInsight(insight);
    } catch (err) {
      setError('Failed to generate AI insight. Please try again.');
      console.error(err);
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-dark">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!selectedFund ? (
          <>
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Explore Mutual Funds</h1>
              <p className="text-lg text-slate-600">Find your next investment opportunity.</p>
            </div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 animate-slide-in-up">
              {filteredFunds.map(fund => (
                <FundCard key={fund.id} fund={fund} onSelect={() => handleSelectFund(fund)} />
              ))}
            </div>
          </>
        ) : (
          <FundDetail 
            fund={selectedFund} 
            onClose={handleCloseDetail} 
            onGenerateInsight={handleGenerateInsight}
            aiInsight={aiInsight}
            isGeneratingInsight={isGeneratingInsight}
            error={error}
          />
        )}
      </main>
    </div>
  );
};

export default App;
