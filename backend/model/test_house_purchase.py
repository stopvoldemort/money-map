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
        bank_account = Account("Bank of America", AccountType.BANK, 1000000)
        self.name = "test house"
        self.home_price = 1000
        self.annual_interest_rate = 0.10
        self.first_year = 2024
        self.loan_term_years = 2
        self.from_account = bank_account
        self.down_payment_proportion = 0.2
        self.property_tax_rate = 0.005
        self.annual_insurance_rate = 0.005
        self.annual_upkeep_cost = 5000
        self.aagr = 0.01
        self.closing_costs_proportion = 0.04

        self.house_purchase = HousePurchase(
            name=self.name,
            home_price=self.home_price,
            annual_interest_rate=self.annual_interest_rate,
            aagr=self.aagr,
            first_year=self.first_year,
            loan_term_years=self.loan_term_years,
            from_account=self.from_account,
            down_payment_proportion=self.down_payment_proportion,
            property_tax_rate=self.property_tax_rate,
            annual_insurance_rate=self.annual_insurance_rate,
            annual_upkeep_cost=self.annual_upkeep_cost,
            closing_costs_proportion=self.closing_costs_proportion,
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

        house, debt, expenses, transfers = self.house_purchase.execute()

        # Print house attributes
        print(f"House: {house}")
        print(f"House Name: {house.name}, Value: {house.value}")

        # Print debt attributes
        print(f"Debt: {debt}")
        print(f"Debt Name: {debt.name}, Amount: {debt.amount}")

        # Print expenses
        print("Expenses:")
        for expense in expenses:
            print(f"  Name: {expense.name}, Amount: {expense.amount}, Year: {expense.year}")

        # Print transfers
        print("Transfers:")
        for transfer in transfers:
            print(f"  Name: {transfer.name}, Amount: {transfer.amount}, Year: {transfer.year}, From: {transfer.transfer_from}, To: {transfer.transfer_to}, Required: {transfer.required}")


        # Test Asset
        self.assertEqual(house.name, "test house")
        self.assertEqual(house.value, 1000)

        # Test Debt
        self.assertEqual(debt.name, "test house mortgage")
        self.assertEqual(debt.amount, 1000)

        # Test Transfers
        # self.assertEqual(len(transfers), 3)
        self.assertTransferIn(
            "down payment", 200, 2024, self.from_account, debt, True, transfers
        )
        self.assertTransferIn(
            "mortgage scheduled payment 2024",
            442.99,
            2024,
            self.from_account,
            debt,
            True,
            transfers,
        )
        self.assertTransferIn(
            "mortgage scheduled payment 2025",
            442.99,
            2025,
            self.from_account,
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
