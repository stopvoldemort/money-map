import unittest
from model.annual_investment_allocation import AnnualInvestmentAllocation
from model.investment_proportion import InvestmentProportion
from model.investment_vehicle import InvestmentVehicle

class TestAnnualInvestmentAllocation(unittest.TestCase):
    def test_validation(self):
        with self.assertRaises(ValueError):
            AnnualInvestmentAllocation(2024, [
                InvestmentProportion('stock', 0.5),
                InvestmentProportion('bond', 0.4),
            ])

    def test_annual_growth(self):
        allocation = AnnualInvestmentAllocation(2024, [
            InvestmentProportion('stock', 0.6),
            InvestmentProportion('bond', 0.4),
        ])
        vehicles = [
            InvestmentVehicle('stock', 0.1),
            InvestmentVehicle('bond', 0.05),
        ]
        growth = allocation.annual_growth(1000.0, vehicles)
        self.assertAlmostEqual(growth, 80.0, places=2)

if __name__ == '__main__':
    unittest.main()
