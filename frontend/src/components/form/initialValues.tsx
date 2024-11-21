import { ACCOUNT_TYPES, YEARS } from "../../constants";


export const initialValues = {
  expenses: [],
  incomes: [],
  accounts: [
    {
      name: "Bank accounts",
      account_type: ACCOUNT_TYPES.BANK,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.START,
      investments: [
        {
          name: "stocks",
          color: "steelblue",
          anchors: [
            { year: 2024, value: 80 },
            { year: 2029, value: 80 },
            { year: 2034, value: 80 },
            { year: 2039, value: 80 },
            { year: 2044, value: 80 },
            { year: 2049, value: 80 },
            { year: 2054, value: 80 },
            { year: 2059, value: 80 },
            { year: 2064, value: 80 },
            { year: 2070, value: 80 },
          ],
        },
        {
          name: "bonds",
          color: "lightgreen",
          anchors: [
            { year: 2024, value: 20 },
            { year: 2029, value: 20 },
            { year: 2034, value: 20 },
            { year: 2039, value: 20 },
            { year: 2044, value: 20 },
            { year: 2049, value: 20 },
            { year: 2054, value: 20 },
            { year: 2059, value: 20 },
            { year: 2064, value: 20 },
            { year: 2070, value: 20 },
          ],
        },
      ],
    },
    {
      name: "Investment accounts",
      account_type: ACCOUNT_TYPES.INVESTMENT,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.START,
      investments: [],
    },
    {
      name: "Traditional IRA/401k accounts",
      account_type: ACCOUNT_TYPES.RETIREMENT,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.RETIREMENT_START,
      investments: [],
    },
    {
      name: "Roth IRA/401k accounts",
      account_type: ACCOUNT_TYPES.ROTH_IRA,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.RETIREMENT_START,
      investments: [],
    },
    {
      name: "529 accounts",
      account_type: ACCOUNT_TYPES.FIVE_TWO_NINE,
      starting_balance: 0,
      earliest_withdrawal_year: YEARS.START,
      investments: [],
    },
  ],
};
