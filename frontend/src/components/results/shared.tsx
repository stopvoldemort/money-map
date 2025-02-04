import currency from "currency.js";

export interface ChartElement {
  name: string;
  value: number;
}

export interface ScenarioResults {
  id: string;
  name: string;
  year_results: ScenarioYearResults[];
}

export interface ScenarioYearResults {
  year: number;
  net_worth: number;
  five_two_nine: number;
  investment: number;
  bank_account: number;
  roth_ira: number;
  debt: number;
  expenses: ChartElement[];
  debt_payments: ChartElement[];
  taxes: ChartElement[];
  incomes: ChartElement[];
}

// Format number to millions
export const formatYAxis = (value: number) => {
  if (Math.abs(value) >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (Math.abs(value) >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
};

export const formatDollars = (value: number) => {
  return currency(value, { precision: 0 }).format();
};
