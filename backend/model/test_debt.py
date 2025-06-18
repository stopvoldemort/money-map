import unittest
from model.debt import Debt

class TestDebt(unittest.TestCase):
    def test_pay_and_add_and_growth(self):
        debt = Debt('loan', 100.0, 0.1)
        debt.pay(40.0)
        self.assertAlmostEqual(debt.amount, 60.0, places=2)
        debt.add(20.0)
        self.assertAlmostEqual(debt.amount, 80.0, places=2)
        debt.apply_annual_growth(0.05)
        self.assertAlmostEqual(debt.annual_growth, 8.0, places=2)
        # amount after growth then inflation adjustment
        self.assertAlmostEqual(debt.amount, (80.0*1.1)/1.05, places=2)

if __name__ == '__main__':
    unittest.main()
