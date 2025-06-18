import unittest
from model.account import Account
from model.account_type import AccountType
from model.annual_investment_allocation import AnnualInvestmentAllocation
from model.investment_proportion import InvestmentProportion
from model.investment_vehicle import InvestmentVehicle
from model.withdrawal_tax_type import WithdrawalTaxType


class TestAccount(unittest.TestCase):
    def test_deposit(self):
        account = Account("checking", AccountType.BANK, 1000)
        account.deposit(500)
        self.assertEqual(account.principal, 1500)
        self.assertEqual(account.balance(), 1500)

    def test_apply_annual_growth(self):
        allocation = AnnualInvestmentAllocation(
            2024,
            [InvestmentProportion("stock", 1.0)],
        )
        account = Account(
            "investment",
            AccountType.INVESTMENT,
            1000,
            annual_investment_allocations=[allocation],
        )
        vehicles = [InvestmentVehicle("stock", 0.1)]
        account.apply_annual_growth(2024, vehicles)
        self.assertAlmostEqual(account.gains, 100.0, places=2)
        self.assertAlmostEqual(account.balance(), 1100.0, places=2)
        # subsequent years without allocation should not change gains
        account.apply_annual_growth(2025, vehicles)
        self.assertAlmostEqual(account.gains, 100.0, places=2)

    def test_withdraw_mixed_principal_and_gains(self):
        allocation = AnnualInvestmentAllocation(
            2024,
            [InvestmentProportion("stock", 1.0)],
        )
        account = Account(
            "investment",
            AccountType.INVESTMENT,
            1000,
            annual_investment_allocations=[allocation],
        )
        vehicles = [InvestmentVehicle("stock", 0.1)]
        account.apply_annual_growth(2024, vehicles)
        withdrawal = account.withdraw(550)
        self.assertAlmostEqual(account.principal, 500.0, places=2)
        self.assertAlmostEqual(account.gains, 50.0, places=2)
        self.assertAlmostEqual(withdrawal.capital_gains, 50.0, places=2)
        self.assertEqual(withdrawal.tax_type, WithdrawalTaxType.CAPITAL_GAINS)

    def test_withdraw_zero(self):
        account = Account("checking", AccountType.BANK, 100)
        withdrawal = account.withdraw(0)
        self.assertEqual(withdrawal.amount, 0.0)
        self.assertEqual(withdrawal.tax_type, WithdrawalTaxType.NONE)
        self.assertEqual(account.balance(), 100)

    def test_withdraw_insufficient_funds(self):
        account = Account("checking", AccountType.BANK, 100)
        with self.assertRaises(ValueError):
            account.withdraw(200)

    def test_rebalance_transfers_excess(self):
        dest = Account("savings", AccountType.BANK, 0)
        source = Account(
            "checking",
            AccountType.BANK,
            1500,
            maximum_balance=1000,
            syphon_excess_to=dest,
        )
        withdrawal = source.rebalance(2024)
        self.assertIsNotNone(withdrawal)
        self.assertAlmostEqual(withdrawal.amount, 500.0, places=2)
        self.assertEqual(dest.balance(), 500.0)
        self.assertEqual(source.balance(), 1000.0)


if __name__ == "__main__":
    unittest.main()
