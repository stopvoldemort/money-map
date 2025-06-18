import unittest
from model.asset import Asset
from model.account import Account
from model.account_type import AccountType

class TestAsset(unittest.TestCase):
    def test_apply_growth_and_tax_bill(self):
        asset = Asset('stock', 1000.0, 0.1, 0.2)
        asset.apply_annual_growth()
        self.assertAlmostEqual(asset.value, 1100.0, places=2)
        self.assertAlmostEqual(asset.annual_growth, 100.0, places=2)
        self.assertAlmostEqual(asset.annual_tax_bill(), 1100.0 * 0.2, places=2)

    def test_sell(self):
        deposit_account = Account('bank', AccountType.BANK, 0)
        asset = Asset('car', 5000.0, 0.0, 0.0, sell_on=2025, sales_taxes_amount=100.0, deposit_sales_proceeds_in=deposit_account)
        income, expense = asset.sell()
        self.assertEqual(asset.value, 0.0)
        self.assertEqual(income.amount, 5000.0)
        self.assertEqual(income.year, 2025)
        self.assertIs(income.deposit_in, deposit_account)
        self.assertEqual(expense.amount, 100.0)
        self.assertEqual(expense.year, 2025)

if __name__ == '__main__':
    unittest.main()
