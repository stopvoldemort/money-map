import unittest
from model.payer import Payer
from model.expense import Expense
from model.debt import Debt
from model.account import Account
from model.account_type import AccountType

class TestPayer(unittest.TestCase):
    def test_pay_with_529_and_bank(self):
        acc_529 = Account('529', AccountType.FIVE_TWO_NINE, 200)
        bank = Account('bank', AccountType.BANK, 100)
        expenses = [
            Expense('tuition', 150, 2024, five_two_nine_eligible=True),
            Expense('books', 80, 2024)
        ]
        withdrawals = Payer.attempt_to_pay_payables(2024, expenses, [acc_529, bank])
        self.assertEqual(len(withdrawals), 2)
        self.assertAlmostEqual(acc_529.balance(), 50.0, places=2)
        self.assertAlmostEqual(bank.balance(), 20.0, places=2)
        self.assertEqual(expenses[0].amount, 0)
        self.assertEqual(expenses[1].amount, 0)

    def test_pay_debt(self):
        bank = Account('bank', AccountType.BANK, 50)
        debt = Debt('loan', 100, 0.0)
        withdrawals = Payer.attempt_to_pay_payables(2024, [debt], [bank])
        self.assertEqual(len(withdrawals), 1)
        self.assertAlmostEqual(debt.amount, 50.0, places=2)
        self.assertAlmostEqual(bank.balance(), 0.0, places=2)

if __name__ == '__main__':
    unittest.main()
