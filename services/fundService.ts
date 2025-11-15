
import type { MutualFund, HistoricalDataPoint } from '../types';

const generateHistoricalData = (baseNav: number, years: number): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  let currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - years);
  let currentNav = baseNav * (0.8 + Math.random() * 0.4); // Start at a random point

  const days = years * 365;

  for (let i = 0; i < days; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    const fluctuation = (Math.random() - 0.49) * 0.02; // Small daily fluctuation
    const trend = 0.0003; // Slight upward trend
    currentNav *= (1 + fluctuation + trend);
    
    if (i % 7 === 0) { // Only add data point once a week to keep it light
        data.push({
            date: currentDate.toISOString().split('T')[0],
            nav: parseFloat(currentNav.toFixed(2)),
        });
    }
  }
  return data;
};

const mockFunds: MutualFund[] = [
  {
    id: '1',
    name: 'Tech Innovators Growth Fund',
    ticker: 'TIGFX',
    fundHouse: 'Innovate Capital',
    category: 'Large Cap Growth',
    strategy: 'Invests primarily in large-capitalization technology companies with high growth potential, focusing on software, hardware, and internet sectors.',
    aum: 12.5,
    expenseRatio: 0.75,
    returns: { oneYear: 25.4, threeYear: 18.2, fiveYear: 22.1 },
    historicalData: generateHistoricalData(150, 5),
    fundManager: 'Jane Doe',
    inceptionDate: '2015-01-10',
  },
  {
    id: '2',
    name: 'Global Health Sciences Fund',
    ticker: 'GHSFX',
    fundHouse: 'LifePath Investments',
    category: 'Sector - Healthcare',
    strategy: 'Focuses on global companies in the healthcare sector, including pharmaceuticals, biotechnology, and medical devices. Aims for long-term capital appreciation.',
    aum: 8.2,
    expenseRatio: 0.88,
    returns: { oneYear: 15.2, threeYear: 12.5, fiveYear: 16.8 },
    historicalData: generateHistoricalData(220, 5),
    fundManager: 'John Smith',
    inceptionDate: '2012-06-22',
  },
  {
    id: '3',
    name: 'Stable Income Bond Fund',
    ticker: 'SIBFIX',
    fundHouse: 'RockSolid Asset Management',
    category: 'Intermediate-Term Bond',
    strategy: 'Invests in a diversified portfolio of investment-grade corporate and government bonds to provide a steady stream of income and capital preservation.',
    aum: 25.1,
    expenseRatio: 0.45,
    returns: { oneYear: 4.5, threeYear: 3.1, fiveYear: 3.8 },
    historicalData: generateHistoricalData(110, 5),
    fundManager: 'Emily White',
    inceptionDate: '2010-03-15',
  },
  {
    id: '4',
    name: 'Emerging Markets Discovery',
    ticker: 'EMDFX',
    fundHouse: 'Frontier Ventures',
    category: 'Diversified Emerging Markets',
    strategy: 'Seeks long-term growth by investing in a diverse mix of companies located in emerging market economies across Asia, Latin America, and Africa.',
    aum: 5.6,
    expenseRatio: 1.25,
    returns: { oneYear: 18.9, threeYear: 9.8, fiveYear: 14.3 },
    historicalData: generateHistoricalData(80, 5),
    fundManager: 'Carlos Garcia',
    inceptionDate: '2018-07-01',
  },
  {
    id: '5',
    name: 'US Value Equity Fund',
    ticker: 'USVEX',
    fundHouse: 'Patriot Financial',
    category: 'Large Cap Value',
    strategy: 'Invests in large, established U.S. companies that appear to be undervalued by the market. Aims for long-term capital growth and dividend income.',
    aum: 18.7,
    expenseRatio: 0.62,
    returns: { oneYear: 12.1, threeYear: 10.5, fiveYear: 11.9 },
    historicalData: generateHistoricalData(180, 5),
    fundManager: 'Sarah Adams',
    inceptionDate: '2008-11-20',
  },
  {
    id: '6',
    name: 'Green Energy Transition Fund',
    ticker: 'GETFX',
    fundHouse: 'Sustainable Future Inc.',
    category: 'Sector - Alternative Energy',
    strategy: 'Invests in companies that are leading the transition to a greener economy, including renewable energy, electric vehicles, and energy efficiency technologies.',
    aum: 3.4,
    expenseRatio: 1.1,
    returns: { oneYear: 35.8, threeYear: 28.2, fiveYear: 30.5 },
    historicalData: generateHistoricalData(50, 5),
    fundManager: 'David Chen',
    inceptionDate: '2019-04-12',
  }
];

export const getMockFunds = (): MutualFund[] => {
  return mockFunds;
};
