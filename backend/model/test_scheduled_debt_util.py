import unittest
from model.scheduled_debt import ScheduledDebt

class TestScheduledDebtUtil(unittest.TestCase):
    def test_generate_debt_and_payments_interest(self):
        debt, payments = ScheduledDebt.generate_debt_and_debt_payments(
            name='house',
            total_amount=100000,
            down_payment_proportion=0.2,
            annual_interest_rate=0.05,
            first_year_of_loan=2024,
            loan_term_years=2,
            inflation_rate=0.0
        )
        self.assertEqual(payments[0].amount, 20000.0)
        # expected annual payment using annuity formula
        expected = 80000 * 0.05 * (1 + 0.05) ** 2 / ((1 + 0.05) ** 2 - 1)
        self.assertAlmostEqual(payments[1].amount, expected, places=2)
        self.assertEqual(len(payments), 3)
        self.assertEqual(payments[1].year, 2024)
        self.assertEqual(payments[2].year, 2025)

    def test_generate_debt_zero_interest_with_inflation(self):
        debt, payments = ScheduledDebt.generate_debt_and_debt_payments(
            name='car',
            total_amount=10000,
            down_payment_proportion=0.1,
            annual_interest_rate=0.0,
            first_year_of_loan=2024,
            loan_term_years=2,
            inflation_rate=0.05
        )
        expected_payment = 9000 / 2
        self.assertAlmostEqual(payments[1].amount, expected_payment, places=2)
        self.assertAlmostEqual(payments[2].amount, expected_payment / 1.05, places=2)
        self.assertEqual(len(payments), 3)

if __name__ == '__main__':
    unittest.main()
