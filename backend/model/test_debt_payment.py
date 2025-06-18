import unittest
from model.debt import Debt
from model.debt_payment import DebtPayment

class TestDebtPayment(unittest.TestCase):
    def test_execute_creates_expense_and_reduces_debt(self):
        debt = Debt('loan', 100.0, 0.0)
        payment = DebtPayment('payment', 30.0, 2024, debt)
        expense = payment.execute()
        self.assertEqual(debt.amount, 70.0)
        self.assertEqual(expense.amount, 30.0)
        self.assertTrue(expense.debt_payment)
        self.assertEqual(expense.year, 2024)

if __name__ == '__main__':
    unittest.main()
