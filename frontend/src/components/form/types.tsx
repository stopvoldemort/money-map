export interface FormValuesType {
  accounts: AccountFieldsType[];
  investment_vehicles: InvestmentVehicleFieldsType[];
  expenses: ExpenseFieldsType[];
  incomes: IncomeFieldsType[];
  assets: AssetFieldsType[];
  scheduled_debts: ScheduledDebtFieldsType[];
}

export interface AccountFieldsType {
  name: string;
  account_type: string;
  starting_balance: number;
  investments: {
    name: string;
    color: string;
    anchors: {
      year: number;
      value: number;
    }[];
  }[];
}

export interface ExpenseFieldsType {
  name: string;
  amount: number;
  five_two_nine_eligible: boolean;
  years: number[];
}

export interface IncomeFieldsType {
  name: string;
  amount: number;
  years: number[];
  federal_income_tax: boolean;
  ny_income_tax: boolean;
  nyc_income_tax: boolean;
  payroll_tax: boolean;
}

export interface InvestmentVehicleFieldsType {
  name: string;
  aagr: number;
  dynamic_mean: number;
  dynamic_std_dev: number;
}

export interface AssetFieldsType {
  name: string;
  value: number;
  aagr: number;
  tax_rate: number;
}

export interface ScheduledDebtFieldsType {
  name: string;
  amount: number;
  aagr: number;
  remaining_loan_term: number;
}
