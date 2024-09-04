from typing import List
from model.investment_proportion import InvestmentProportion


class InvestmentDistribution:
    def __init__(
        self, years: List[int], investment_proportions: List[InvestmentProportion]
    ):
        self.years = years
        self.investment_proportions = investment_proportions

        if (
            sum(
                investment_proportion.proportion
                for investment_proportion in investment_proportions
            )
            != 1
        ):
            raise ValueError("Investment proportions must sum to 1")

    def annual_growth(self, balance: float) -> float:
        growth = 0
        for investment_proportion in self.investment_proportions:
            growth += (
                balance
                * investment_proportion.proportion
                * investment_proportion.investment_vehicle.aagr
            )
        return growth
