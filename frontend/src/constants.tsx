export const YEARS = {
  START: 2025,
  END: 2070,
  RETIREMENT_START: 2039,
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
  STOCKS: "stocks",
  BONDS: "bonds",
};
