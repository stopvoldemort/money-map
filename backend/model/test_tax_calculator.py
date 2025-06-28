import unittest
from model.tax_calculator import TaxCalculator, TaxBracket

class TestTaxCalculator(unittest.TestCase):
    def setUp(self):
        self.calc = TaxCalculator(
            state_tax_brackets=[TaxBracket(0.1,0,10000)],
            state_standard_deduction=1000,
            local_tax_brackets=[TaxBracket(0.05,0,10000)],
            local_standard_deduction=500,
            federal_tax_brackets=[
                TaxBracket(0.1,0,10000),
                TaxBracket(0.2,10000,20000)
            ],
            federal_standard_deduction=1000,
        )

    def test_capital_gains_rate(self):
        self.assertEqual(self.calc.capital_gains_tax_rate(), 0.15)

    def test_calculate_federal_tax(self):
        tax = self.calc.calculate_federal_income_tax(15000)
        self.assertAlmostEqual(tax, 1800.0, places=2)

    def test_tax_zero_income(self):
        tax = self.calc.calculate_federal_income_tax(500)
        self.assertEqual(tax, 0)

    def test_calculate_payroll_tax_under_cap(self):
        tax = self.calc.calculate_payroll_tax(10000)
        self.assertAlmostEqual(tax, 765.0, places=2)

    def test_calculate_payroll_tax_above_additional_threshold(self):
        tax = self.calc.calculate_payroll_tax(210000)
        expected = (
            168600 * 0.0765
            + (200000 - 168600) * 0.0145
            + (210000 - 200000) * 0.0235
        )
        self.assertAlmostEqual(tax, expected, places=2)

if __name__ == '__main__':
    unittest.main()
