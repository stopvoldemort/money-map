import { ACCOUNT_TYPES, INVESTMENT_VEHICLES, YEARS } from "../../constants";


export const initialValues = {
  expenses: [],
  incomes: [],
  assets: [],
  scheduled_debts: [],
  other_debts: [],
  transfers: [],
  accounts: [
    {
      name: "Bank accounts",
      account_type: ACCOUNT_TYPES.BANK,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.START,
      investments: [],
    },
    {
      name: "Investment accounts",
      account_type: ACCOUNT_TYPES.INVESTMENT,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.START,
      investments: [
        {
          name: "stocks",
          color: "steelblue",
          anchors: [
            { year: 2025, value: 70 },
            { year: 2030, value: 70 },
            { year: 2035, value: 70 },
            { year: 2040, value: 70 },
            { year: 2045, value: 70 },
            { year: 2050, value: 70 },
            { year: 2055, value: 70 },
            { year: 2060, value: 70 },
            { year: 2065, value: 70 },
            { year: 2070, value: 70 },
          ],
        },
        {
          name: "bonds",
          color: "lightgreen",
          anchors: [
            { year: 2025, value: 30 },
            { year: 2030, value: 30 },
            { year: 2035, value: 30 },
            { year: 2040, value: 30 },
            { year: 2045, value: 30 },
            { year: 2050, value: 30 },
            { year: 2055, value: 30 },
            { year: 2060, value: 30 },
            { year: 2065, value: 30 },
            { year: 2070, value: 30 },
          ],
        },
      ],
    },
    {
      name: "Traditional IRA/401k accounts",
      account_type: ACCOUNT_TYPES.RETIREMENT,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.RETIREMENT_START,
      investments: [
        {
          name: "stocks",
          color: "steelblue",
          anchors: [
            { year: 2025, value: 100 },
            { year: 2030, value: 90 },
            { year: 2035, value: 80 },
            { year: 2040, value: 70 },
            { year: 2045, value: 60 },
            { year: 2050, value: 50 },
            { year: 2055, value: 50 },
            { year: 2060, value: 50 },
            { year: 2065, value: 50 },
            { year: 2070, value: 50 },
          ],
        },
        {
          name: "bonds",
          color: "lightgreen",
          anchors: [
            { year: 2025, value: 0 },
            { year: 2030, value: 10 },
            { year: 2035, value: 20 },
            { year: 2040, value: 30 },
            { year: 2045, value: 40 },
            { year: 2050, value: 50 },
            { year: 2055, value: 50 },
            { year: 2060, value: 50 },
            { year: 2065, value: 50 },
            { year: 2070, value: 50 },
          ],
        },
      ],
    },
    {
      name: "Roth IRA/401k accounts",
      account_type: ACCOUNT_TYPES.ROTH_IRA,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.RETIREMENT_START,
      investments: [
        {
          name: "stocks",
          color: "steelblue",
          anchors: [
            { year: 2025, value: 100 },
            { year: 2030, value: 90 },
            { year: 2035, value: 80 },
            { year: 2040, value: 70 },
            { year: 2045, value: 60 },
            { year: 2050, value: 50 },
            { year: 2055, value: 50 },
            { year: 2060, value: 50 },
            { year: 2065, value: 50 },
            { year: 2070, value: 50 },
          ],
        },
        {
          name: "bonds",
          color: "lightgreen",
          anchors: [
            { year: 2025, value: 0 },
            { year: 2030, value: 10 },
            { year: 2035, value: 20 },
            { year: 2040, value: 30 },
            { year: 2045, value: 40 },
            { year: 2050, value: 50 },
            { year: 2055, value: 50 },
            { year: 2060, value: 50 },
            { year: 2065, value: 50 },
            { year: 2070, value: 50 },
          ],
        },
      ],
    },
    {
      name: "529 accounts",
      account_type: ACCOUNT_TYPES.FIVE_TWO_NINE,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.START,
      investments: [
        {
          name: "stocks",
          color: "steelblue",
          anchors: [
            { year: 2025, value: 70 },
            { year: 2030, value: 60 },
            { year: 2035, value: 50 },
            { year: 2040, value: 50 },
            { year: 2045, value: 50 },
            { year: 2050, value: 50 },
            { year: 2055, value: 50 },
            { year: 2060, value: 50 },
            { year: 2065, value: 50 },
            { year: 2070, value: 50 },
          ],
        },
        {
          name: "bonds",
          color: "lightgreen",
          anchors: [
            { year: 2025, value: 30 },
            { year: 2030, value: 40 },
            { year: 2035, value: 50 },
            { year: 2040, value: 50 },
            { year: 2045, value: 50 },
            { year: 2050, value: 50 },
            { year: 2055, value: 50 },
            { year: 2060, value: 50 },
            { year: 2065, value: 50 },
            { year: 2070, value: 50 },
          ],
        },
      ],
    },
  ],
  investment_vehicles: [
    {
      name: INVESTMENT_VEHICLES.STOCKS,
      aagr: 0.0655,
      dynamic_mean: 0.077,
      dynamic_std_dev: 0.1175,
    },
    {
      name: INVESTMENT_VEHICLES.BONDS,
      aagr: 0.0352,
      dynamic_mean: 0.039,
      dynamic_std_dev: 0.0855,
    },
  ],
};
