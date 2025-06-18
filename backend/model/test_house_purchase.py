import unittest
from model.house_purchase import HousePurchase

class TestHousePurchase(unittest.TestCase):
    def test_execute_outputs(self):
        hp = HousePurchase(
            name='test house',
            home_price=1000,
            closing_costs_proportion=0.04,
            annual_insurance_rate=0.005,
            annual_upkeep_cost=5000,
            annual_interest_rate=0.10,
            aagr=0.01,
            first_year=2024,
            loan_term_years=2,
            down_payment_proportion=0.2,
            property_tax_rate=0.005,
            inflation_rate=0.0,
        )
        house, debt, expenses, debt_payments = hp.execute()
        self.assertEqual(house.value, 1000)
        self.assertEqual(debt.amount, 1000)
        self.assertEqual(expenses[0].name, 'test house closing costs')
        self.assertEqual(expenses[0].amount, 40)
        self.assertEqual(debt_payments[0].name, 'test house down payment')
        self.assertEqual(debt_payments[0].year, 2024)
        self.assertEqual(len(debt_payments), 3)

if __name__ == '__main__':
    unittest.main()
