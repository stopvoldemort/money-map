export interface FormValuesType {
  accounts: AccountFieldsType[];
  investment_vehicles: InvestmentVehicleFieldsType[];
  expenses: ExpenseFieldsType[];
  salaries: SalaryFieldsType[];
  social_security: SocialSecurityFieldsType[];
  other_incomes: OtherIncomeFieldsType[];
  assets: AssetFieldsType[];
  scheduled_debts: ScheduledDebtFieldsType[];
  other_debts: OtherDebtFieldsType[];
  transfers: TransferFieldsType[];
  house_purchases: AssetPurchaseFieldsType[];
  config: ConfigFieldsType;
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

export interface SocialSecurityFieldsType {
  name: string;
  amount: number;
  from_year: number;
}

export interface OtherIncomeFieldsType {
  name: string;
  amount: number;
  years: number[];
  federal_income_tax: boolean;
  state_income_tax: boolean;
  local_income_tax: boolean;
  payroll_tax: boolean;
}

export interface InvestmentVehicleFieldsType {
  name: string;
  aagr: number;
}

export interface AssetFieldsType {
  name: string;
  value: number;
  aagr: number;
  tax_rate: number;
  sell_on: number;
  sales_taxes_amount: number;
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

export interface AssetPurchaseFieldsType {
  name: string;
  price: number;
  interest_rate: number;
  year_of_purchase: number;
  loan_term_years: number;
  down_payment_proportion: number;
  property_tax_rate: number;
  annual_insurance_rate: number;
  annual_upkeep_cost: number;
  closing_costs_proportion: number;
  aagr: number;
}

export interface ConfigFieldsType {
  first_year: number;
  last_year: number;
  state: string;
  locality: string;
  retirement_withdrawal_year: number;
  unscheduled_debt_interest_rate: number;
  maximum_bank_account_balance: number;
  inflation_rate: number;
  state_tax_brackets: TaxBracketFieldsType[];
  state_standard_deduction: number;
  local_tax_brackets: TaxBracketFieldsType[];
  local_standard_deduction: number;
}

export interface TaxBracketFieldsType {
  upper_bound: number;
  rate: number;
}
