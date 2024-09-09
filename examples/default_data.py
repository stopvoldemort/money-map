default_data = {
    "investment_vehicles": [
        {
            "name": "stocks",
            "aagr": 0.0655,
            "dynamic_mean": 0.077,
            "dynamic_std_dev": 0.1175,
        },
        {
            "name": "bonds",
            "aagr": 0.0352,
            "dynamic_mean": 0.039,
            "dynamic_std_dev": 0.0855,
        },
    ],
    "debts": [],
    "assets": [],
    "accounts": [
        {
            "name": "vanguard mutual funds",
            "account_type": "investments",
            "starting_balance": 10000.0,
            "earliest_withdrawal_year": 2024,
            "investment_distributions": [
                {
                    "years": "2024-2048",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.9},
                        {"investment_vehicle": "bonds", "proportion": 0.1},
                    ],
                },
                {
                    "years": "2048-2070",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.5},
                        {"investment_vehicle": "bonds", "proportion": 0.5},
                    ],
                },
            ],
        },
        {
            "name": "fidelity IRA",
            "account_type": "retirement",
            "starting_balance": 250000.0,
            "earliest_withdrawal_year": 2039,
            "investment_distributions": [
                {
                    "years": "2024-2030",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.9},
                        {"investment_vehicle": "bonds", "proportion": 0.1},
                    ],
                },
                {
                    "years": "2031-2036",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.8},
                        {"investment_vehicle": "bonds", "proportion": 0.2},
                    ],
                },
                {
                    "years": "2037-2042",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.7},
                        {"investment_vehicle": "bonds", "proportion": 0.3},
                    ],
                },
                {
                    "years": "2043-2048",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.6},
                        {"investment_vehicle": "bonds", "proportion": 0.4},
                    ],
                },
                {
                    "years": "2049-2070",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.5},
                        {"investment_vehicle": "bonds", "proportion": 0.5},
                    ],
                },
            ],
        },
        {
            "name": "chase (checking + savings)",
            "account_type": "bank",
            "starting_balance": 30000.0,
            "earliest_withdrawal_year": 2024,
            "investment_distributions": [],
        },
        {
            "name": "nysaves (college fund)",
            "account_type": "529",
            "starting_balance": 85000.0,
            "earliest_withdrawal_year": 2024,
            "investment_distributions": [
                {
                    "years": "2024-2026",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.9},
                        {"investment_vehicle": "bonds", "proportion": 0.1},
                    ],
                },
                {
                    "years": "2027-2029",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.8},
                        {"investment_vehicle": "bonds", "proportion": 0.2},
                    ],
                },
                {
                    "years": "2030-2032",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.7},
                        {"investment_vehicle": "bonds", "proportion": 0.3},
                    ],
                },
                {
                    "years": "2033-2036",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.6},
                        {"investment_vehicle": "bonds", "proportion": 0.4},
                    ],
                },
                {
                    "years": "2037-2070",
                    "investment_proportions": [
                        {"investment_vehicle": "stocks", "proportion": 0.5},
                        {"investment_vehicle": "bonds", "proportion": 0.5},
                    ],
                },
            ],
        },
    ],
    "incomes": [
        {
            "name": "john full-time",
            "amount": 80000.0,
            "years": "2024-2039",
            "deposit_in": "chase (checking + savings)",
            "federal_income_tax": True,
            "payroll_tax": True,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "jane full-time",
            "amount": 80000.0,
            "years": "2024-2039",
            "deposit_in": "chase (checking + savings)",
            "federal_income_tax": True,
            "payroll_tax": True,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "john part-time",
            "amount": 50000.0,
            "years": "2040-2049",
            "deposit_in": "chase (checking + savings)",
            "federal_income_tax": True,
            "payroll_tax": True,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "jane part-time",
            "amount": 50000.0,
            "years": "2040-2049",
            "deposit_in": "chase (checking + savings)",
            "federal_income_tax": True,
            "payroll_tax": True,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "john social security (start at 68)",
            "amount": 35000.0,
            "years": "2052-2070",
            "deposit_in": "chase (checking + savings)",
            "federal_income_tax": True,
            "payroll_tax": False,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "jane social security (start at 68)",
            "amount": 35000.0,
            "years": "2052-2070",
            "deposit_in": "chase (checking + savings)",
            "federal_income_tax": True,
            "payroll_tax": False,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
    ],
    "expenses": [
        {
            "name": "car",
            "amount": 40000.0,
            "years": "2027, 2037, 2047, 2057, 2067",
            "five_two_nine_eligible": False,
        },
        {
            "name": "daughter college",
            "amount": 35000.0,
            "years": "2039, 2040, 2041, 2042",
            "five_two_nine_eligible": True,
        },
        {
            "name": "son college",
            "amount": 35000.0,
            "years": "2037, 2038, 2039, 2040",
            "five_two_nine_eligible": True,
        },
        {
            "name": "every day expenses w/ kids",
            "amount": 80000.0,
            "years": "2024-2042",
            "five_two_nine_eligible": False,
        },
        {
            "name": "every day expenses post-kids",
            "amount": 70000.0,
            "years": "2043-2070",
            "five_two_nine_eligible": False,
        },
        {
            "name": "son daycare",
            "amount": 12000.0,
            "years": "2024, 2025, 2026",
            "five_two_nine_eligible": False,
        },
        {
            "name": "rent",
            "amount": 31500.0,
            "years": "2024-2070",
            "five_two_nine_eligible": False,
        },
    ],
    "gifts": [
        {
            "name": "grandpa college contribution",
            "amount": 2000.0,
            "years": "2024-2037",
            "account": "nysaves (college fund)",
        }
    ],
    "transfers": [
        {
            "name": "retirement contribution",
            "amount": 10000.0,
            "years": "2024-2039",
            "transfer_from": "chase (checking + savings)",
            "transfer_to": "fidelity IRA",
            "required": False,
        }
    ],
    "house_purchases": [],
}
