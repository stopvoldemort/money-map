import unittest
from model.account import Account
from model.account_type import AccountType
from model.asset import Asset
from model.debt import Debt
from model.expense import Expense
from model.transfer import Transfer
from model.house_purchase import HousePurchase


class TestHousePurchase(unittest.TestCase):
    def setUp(self):
        generic_account = Account("Bank of America", AccountType.BANK, 1000000)
        self.home_price = 1000
        self.annual_interest_rate = 0.10
        self.first_year = 2024
        self.loan_term_years = 2
        self.last_year = 2026
        self.mortgage_acct_src = generic_account
        self.down_payment_acct_src = generic_account
        self.down_payment_proportion = 0.2
        self.property_tax_rate = 0.005

        self.house_purchase = HousePurchase(
            home_price=self.home_price,
            annual_interest_rate=self.annual_interest_rate,
            first_year=self.first_year,
            loan_term_years=self.loan_term_years,
            last_year=self.last_year,
            mortgage_acct_src=self.mortgage_acct_src,
            down_payment_acct_src=self.down_payment_acct_src,
            down_payment_proportion=self.down_payment_proportion,
            property_tax_rate=self.property_tax_rate,
        )

    def assertExpenseIn(self, name, amount, year, expenses):
        self.assertTrue(
            any(
                expense.name == name
                # This amount comparison should be within a dollar or so
                and abs(expense.amount - amount) < 1 and expense.year == year
                for expense in expenses
            ),
            f"Expense with name '{name}', amount '{amount}', and year '{year}' not found in expenses",
        )

    def assertTransferIn(
        self, name, amount, year, transfer_from, transfer_to, required, transfers
    ):
        self.assertTrue(
            any(
                transfer.name == name
                # This amount comparison should be within a dollar or so
                and abs(transfer.amount - amount) < 1
                and transfer.year == year
                and transfer.transfer_from == transfer_from
                and transfer.transfer_to == transfer_to
                and transfer.required == required
                for transfer in transfers
            ),
            f"Transfer with name '{name}', amount '{amount}', year '{year}', transfer_from '{transfer_from}', transfer_to '{transfer_to}', and required '{required}' not found in transfers",
        )

    def test_execute(self):
        house, debt, expenses, transfers = self.house_purchase.execute()

        # Test Asset
        self.assertEqual(house.name, "house")
        self.assertEqual(house.value, 1000)

        # Test Debt
        self.assertEqual(debt.name, "mortgage")
        self.assertEqual(debt.amount, 1000)

        # Test Transfers
        self.assertEqual(len(transfers), 3)
        self.assertTransferIn(
            "down payment", 200, 2024, self.down_payment_acct_src, debt, True, transfers
        )
        self.assertTransferIn(
            "mortgage scheduled payment 2024",
            442.99,
            2024,
            self.mortgage_acct_src,
            debt,
            True,
            transfers,
        )
        self.assertTransferIn(
            "mortgage scheduled payment 2025",
            442.99,
            2025,
            self.mortgage_acct_src,
            debt,
            True,
            transfers,
        )

        # Test Expenses
        self.assertEqual(len(expenses), 4)
        self.assertExpenseIn("house closing costs", 40, 2024, expenses)
        self.assertExpenseIn(
            "maintenance, insurance, extra utilities 2024", 1215.5, 2024, expenses
        )
        self.assertExpenseIn(
            "maintenance, insurance, extra utilities 2025", 1215.5, 2025, expenses
        )
        self.assertExpenseIn(
            "maintenance, insurance, extra utilities 2026", 1215.5, 2026, expenses
        )


if __name__ == "__main__":
    unittest.main()
