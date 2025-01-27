export type Adult = {
  name: string;
  age: number;
  income: number;
}

export type Child = {
  name: string;
  age: number;
}

export type Home = {
  value: number;
  interestRate: number;
  remainingPrincipal: number;
  remainingYears: number;
}

export type GettingStartedFormValues = {
  adults: Adult[];
  hasPartner: boolean;
  hasChildren: boolean;
  children: Child[];
  annualSpending: number;
  bankAccounts: number;
  investments: number;
  retirement: number;
  hasHome: boolean;
  home: Home;
}