
export interface HistoricalDataPoint {
  date: string;
  nav: number;
}

export interface MutualFund {
  id: string;
  name: string;
  ticker: string;
  fundHouse: string;
  category: string;
  strategy: string;
  aum: number; // in billions
  expenseRatio: number; // in percentage
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  historicalData: HistoricalDataPoint[];
  fundManager: string;
  inceptionDate: string;
}
