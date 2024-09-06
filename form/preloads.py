preload_data = {
    "debts": [{"name": "some random debt", "amount": 1000.0, "aagr": 0.03}],
    "accounts": [
        {
            "name": "vanguard",
            "account_type": "investments",
            "starting_balance": 150000.0,
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
            "name": "fidelity",
            "account_type": "retirement",
            "starting_balance": 730000.0,
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
            "name": "boa",
            "account_type": "bank",
            "starting_balance": 30000.0,
            "earliest_withdrawal_year": 2024,
            "investment_distributions": [],
        },
        {
            "name": "nysaves",
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
            "name": "david full-time",
            "amount": 130000.0,
            "years": "2024-2039",
            "deposit_in": "boa",
            "federal_income_tax": True,
            "payroll_tax": True,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "claire full-time",
            "amount": 120000.0,
            "years": "2024-2039",
            "deposit_in": "boa",
            "federal_income_tax": True,
            "payroll_tax": True,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "david part-time",
            "amount": 70000.0,
            "years": "2040-2049",
            "deposit_in": "boa",
            "federal_income_tax": True,
            "payroll_tax": True,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "claire part-time",
            "amount": 80000.0,
            "years": "2040-2049",
            "deposit_in": "boa",
            "federal_income_tax": True,
            "payroll_tax": True,
            "ny_income_tax": True,
            "nyc_income_tax": True,
        },
        {
            "name": "david social security",
            "amount": 35000,
            "years": "2052-2070",
            "deposit_in": "boa",
            "payroll_tax": False,
        },
        {
            "name": "claire social security",
            "amount": 35000,
            "years": "2052-2070",
            "deposit_in": "boa",
            "payroll_tax": False,
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
            "name": "zach college",
            "amount": 50000.0,
            "years": "2039, 2040, 2041, 2042",
            "five_two_nine_eligible": True,
        },
        {
            "name": "sloane college",
            "amount": 50000.0,
            "years": "2037, 2038, 2039, 2040",
            "five_two_nine_eligible": True,
        },
        {
            "name": "copake",
            "amount": 12000.0,
            "years": "2024-2044",
            "five_two_nine_eligible": False,
        },
        {
            "name": "every day expenses",
            "amount": 101500.0,
            "years": "2024-2070",
            "five_two_nine_eligible": False,
        },
        {
            "name": "zach daycare",
            "amount": 20000.0,
            "years": "2024, 2025, 2026",
            "five_two_nine_eligible": False,
        },
    ],
    "gifts": [
        {
            "name": "dad 529",
            "amount": 8000.0,
            "years": "2024-2037",
            "account": "nysaves",
        }
    ],
    "transfers": [
        {
            "name": "retirement contribution",
            "amount": 45000.0,
            "years": "2024-2039",
            "transfer_from": "boa",
            "transfer_to": "fidelity",
            "required": False,
        }
    ],
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
}
