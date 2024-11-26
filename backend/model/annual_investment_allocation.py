from typing import List
from model.investment_proportion import InvestmentProportion
from model.investment_vehicle import InvestmentVehicle

class AnnualInvestmentAllocation:
    def __init__(
        self, year: int, investment_proportions: List[InvestmentProportion]
    ):
        self.year = year
        self.investment_proportions = investment_proportions

        total_allocation = sum(
            investment_proportion.proportion
            for investment_proportion in investment_proportions
        )
        if abs(total_allocation - 1) > 0.02:
            raise ValueError(f"Investment proportions must sum to 1 (±0.02) for {self.year}: {investment_proportions}")

    def annual_growth(self, balance: float, investment_vehicles: List[InvestmentVehicle]) -> float:
        growth = 0
        for investment_proportion in self.investment_proportions:
            investment_vehicle = next((iv for iv in investment_vehicles if iv.name == investment_proportion.investment_vehicle_name), None)
            growth += (
                balance
                * investment_proportion.proportion
                * investment_vehicle.aagr
            )
        return growth
