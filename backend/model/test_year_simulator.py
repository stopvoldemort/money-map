import unittest
from model.year_simulator import YearSimulator
from model.account import Account
from model.account_type import AccountType
from model.income import Income
from model.expense import Expense
from model.transfer import Transfer
from model.config import Config
from model.tax_calculator import TaxBracket

class TestYearSimulator(unittest.TestCase):
    def setUp(self):
        self.config = Config(
            first_year=2024,
            last_year=2024,
            retirement_withdrawal_year=2050,
            unscheduled_debt_interest_rate=0.05,
            maximum_bank_account_balance=1e9,
            inflation_rate=0.0,
            federal_standard_deduction=0.0,
            federal_tax_brackets=[TaxBracket(0.1, 0, float("inf"))],
            state_standard_deduction=0.0,
            state_tax_brackets=[],
            local_standard_deduction=0.0,
            local_tax_brackets=[],
        )

    def test_execute_basic_scenario(self):
        bank = Account("bank", AccountType.BANK, 0)
        retire = Account("retire", AccountType.RETIREMENT, 0)

        incomes = [
            Income(
                "salary",
                10000,
                2024,
                bank,
                federal_income_tax=True,
                payroll_tax=False,
                state_income_tax=False,
                local_income_tax=False,
            )
        ]
        expenses = [Expense("living", 3000, 2024)]
        transfers = [Transfer("contrib", 2000, 2024, bank, retire)]

        YearSimulator.execute(
            2024,
            [],
            [bank, retire],
            expenses,
            [],
            incomes,
            transfers,
            [],
            [],
            self.config,
        )

        self.assertAlmostEqual(bank.balance(), 4200.0, places=2)
        self.assertAlmostEqual(retire.balance(), 2000.0, places=2)
        fed_tax = next(e for e in expenses if e.name == "Federal income taxes")
        self.assertAlmostEqual(fed_tax.starting_amount, 800.0, places=2)

    def test_unpaid_expenses_create_debt(self):
        bank = Account("bank", AccountType.BANK, 0)
        expenses = [Expense("rent", 1000, 2024)]
        debts = []

        YearSimulator.execute(
            2024,
            [],
            [bank],
            expenses,
            [],
            [],
            [],
            debts,
            [],
            self.config,
        )

        self.assertEqual(len(debts), 1)
        self.assertEqual(debts[0].name, "Unpaid expenses for 2024")
        self.assertAlmostEqual(debts[0].amount, 1000.0, places=2)

if __name__ == "__main__":
    unittest.main()
