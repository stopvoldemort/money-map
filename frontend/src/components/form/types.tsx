export interface FormValuesType {
  accounts: AccountFieldsType[];
  investment_vehicles: InvestmentVehicleFieldsType[];
  expenses: ExpenseFieldsType[];
  salaries: SalaryFieldsType[];
  other_incomes: OtherIncomeFieldsType[];
  assets: AssetFieldsType[];
  scheduled_debts: ScheduledDebtFieldsType[];
  other_debts: OtherDebtFieldsType[];
  transfers: TransferFieldsType[];
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

export interface SalaryFieldsType {
  name: string;
  amount: number;
  from_year: number;
  to_year: number;
  retirement_contribution: number;
  roth_contribution: number;
  employer_retirement_contribution: number;
}

export interface OtherIncomeFieldsType {
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

export interface OtherDebtFieldsType {
  name: string;
  amount: number;
  aagr: number;
}

export interface TransferFieldsType {
  name: string;
  amount: number;
  years: number[];
  transfer_from: string;
  transfer_to: string;
  required: boolean;
}
