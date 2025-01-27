import { ACCOUNT_TYPES, INVESTMENT_VEHICLES, YEARS } from "../../constants";


export const initialValues = {
  name: "Default scenario",
  expenses: [],
  salaries: [],
  social_security: [],
  other_incomes: [],
  assets: [],
  house_purchases: [],
  scheduled_debts: [],
  other_debts: [],
  transfers: [],
  accounts: [
    {
      name: "Bank accounts",
      account_type: ACCOUNT_TYPES.BANK.value,
      starting_balance: 10000,
      investments: [],
    },
    {
      name: "Investment accounts",
      account_type: ACCOUNT_TYPES.INVESTMENT.value,
      starting_balance: 10000,
      investments: [
        {
          name: INVESTMENT_VEHICLES.STOCKS,
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
          name: INVESTMENT_VEHICLES.BONDS,
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
        {
          name: INVESTMENT_VEHICLES.MONEY_MARKET,
          color: "orange",
          anchors: [
            { year: 2025, value: 0 },
            { year: 2030, value: 0 },
            { year: 2035, value: 0 },
            { year: 2040, value: 0 },
            { year: 2045, value: 0 },
            { year: 2050, value: 0 },
            { year: 2055, value: 0 },
            { year: 2060, value: 0 },
            { year: 2065, value: 0 },
            { year: 2070, value: 0 },
          ],
        },
      ],
    },
    {
      name: "Traditional IRA/401k accounts",
      account_type: ACCOUNT_TYPES.RETIREMENT.value,
      starting_balance: 10000,
      investments: [
        {
          name: INVESTMENT_VEHICLES.STOCKS,
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
          name: INVESTMENT_VEHICLES.BONDS,
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
        {
          name: INVESTMENT_VEHICLES.MONEY_MARKET,
          color: "orange",
          anchors: [
            { year: 2025, value: 0 },
            { year: 2030, value: 0 },
            { year: 2035, value: 0 },
            { year: 2040, value: 0 },
            { year: 2045, value: 0 },
            { year: 2050, value: 0 },
            { year: 2055, value: 0 },
            { year: 2060, value: 0 },
            { year: 2065, value: 0 },
            { year: 2070, value: 0 },
          ],
        },
      ],
    },
    {
      name: "Roth IRA/401k accounts",
      account_type: ACCOUNT_TYPES.ROTH_IRA.value,
      starting_balance: 0,
      investments: [
        {
          name: INVESTMENT_VEHICLES.STOCKS,
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
          name: INVESTMENT_VEHICLES.BONDS,
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
        {
          name: INVESTMENT_VEHICLES.MONEY_MARKET,
          color: "orange",
          anchors: [
            { year: 2025, value: 0 },
            { year: 2030, value: 0 },
            { year: 2035, value: 0 },
            { year: 2040, value: 0 },
            { year: 2045, value: 0 },
            { year: 2050, value: 0 },
            { year: 2055, value: 0 },
            { year: 2060, value: 0 },
            { year: 2065, value: 0 },
            { year: 2070, value: 0 },
          ],
        },
      ],
    },
    {
      name: "529 accounts",
      account_type: ACCOUNT_TYPES.FIVE_TWO_NINE.value,
      starting_balance: 0,
      investments: [
        {
          name: INVESTMENT_VEHICLES.STOCKS,
          color: "steelblue",
          anchors: [
            { year: 2025, value: 70 },
            { year: 2030, value: 50 },
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
        {
          name: INVESTMENT_VEHICLES.BONDS,
          color: "lightgreen",
          anchors: [
            { year: 2025, value: 20 },
            { year: 2030, value: 30 },
            { year: 2035, value: 40 },
            { year: 2040, value: 40 },
            { year: 2045, value: 40 },
            { year: 2050, value: 40 },
            { year: 2055, value: 40 },
            { year: 2060, value: 40 },
            { year: 2065, value: 40 },
            { year: 2070, value: 40 },
          ],
        },
        {
          name: INVESTMENT_VEHICLES.MONEY_MARKET,
          color: "orange",
          anchors: [
            { year: 2025, value: 10 },
            { year: 2030, value: 20 },
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
  ],
  investment_vehicles: [
    {
      name: INVESTMENT_VEHICLES.STOCKS,
      aagr: 5.5,
    },
    {
      name: INVESTMENT_VEHICLES.BONDS,
      aagr: 2.5,
    },
    {
      name: INVESTMENT_VEHICLES.MONEY_MARKET,
      aagr: 1.5,
    },
  ],
  config: {
    first_year: YEARS.START,
    last_year: 2055,
    retirement_withdrawal_year: 2039,
    unscheduled_debt_interest_rate: 15.5,
    maximum_bank_account_balance: 20000,
    inflation_rate: 2.0,
    federal_tax_brackets: [
      {
        upper_bound: 23200,
        rate: 10.0,
      }, {
        upper_bound: 94300,
        rate: 12.0,
      }, {
        upper_bound: 201050,
        rate: 22.0,
      }, {
        upper_bound: 383900,
        rate: 24.0,
      }, {
        upper_bound: 487450,
        rate: 32.0,
      }, {
        upper_bound: 731200,
        rate: 35.0,
      }, {
        upper_bound: 999999999,
        rate: 37.0,
      },
    ],
    federal_standard_deduction: 29200,
    local_tax_brackets: [
      {
        upper_bound: 21600,
        rate: 3.078,
      }, {
        upper_bound: 45000,
        rate: 3.762,
      }, {
        upper_bound: 90000,
        rate: 3.819,
      }, {
        upper_bound: 999999999,
        rate: 3.876,
      },
    ],
    local_standard_deduction: 16050.0,
    state_standard_deduction: 16050.0,
    state_tax_brackets: [
      {
        upper_bound: 17150,
        rate: 4.0,
      }, {
        upper_bound: 23600,
        rate: 4.5,
      }, {
        upper_bound: 27900,
        rate: 5.25,
      }, {
        upper_bound: 161550,
        rate: 5.5,
      }, {
        upper_bound: 323200,
        rate: 6.0,
      }, {
        upper_bound: 2155350,
        rate: 6.85,
      }, {
        upper_bound: 5000000,
        rate: 9.65,
      }, {
        upper_bound: 25000000,
        rate: 10.3,
      }, {
        upper_bound: 999999999,
        rate: 10.9,
      },
    ],
  },
};
