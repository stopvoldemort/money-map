export const FORM_VERSION = "1.0.0";

export const YEARS = {
  START: 2025,
  END: 2070,
};

interface AccountType {
  name: string;
  value: string;
}
export const ACCOUNT_TYPES: { [key: string]: AccountType } = {
  BANK: { value: "bank", name: "Bank accounts" },
  RETIREMENT: { name: "Traditional retirement accounts", value: "retirement" },
  INVESTMENT: { name: "Investment accounts", value: "investments" },
  FIVE_TWO_NINE: { name: "529 accounts", value: "529" },
  ROTH_IRA: { name: "Roth accounts", value: "roth_ira" },
};

export const INVESTMENT_VEHICLES = {
  STOCKS: "Stocks",
  BONDS: "Bonds",
  MONEY_MARKET: "Money market",
};

export const NET_WORTH_CHART_TYPE = "net_worth";
export const NET_INCOME_CHART_TYPE = "net_income";
export const COMPARE_SCENARIOS_CHART_TYPE = "compare_scenarios";
