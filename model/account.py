from typing import List, Tuple, Optional
import math
from model.account_type import AccountType
from model.investment_distribution import InvestmentDistribution
from model.withdrawal import Withdrawal


class Account:
    def __init__(
        self,
        name: str,
        account_type: AccountType,
        starting_balance: float,
        investment_distributions: List[InvestmentDistribution] = [],
        earliest_withdrawal_year: int = 0,
    ):
        self.name = name
        self.account_type = account_type
        self.investment_distributions = investment_distributions
        self.earliest_withdrawal_year = earliest_withdrawal_year
        self.principal = starting_balance
        self.gains = 0.0

    def deposit(self, amount: float):
        self.principal += amount

    def apply_annual_growth(self, year: int):
        growth = 0

        for investment_distribution in self.investment_distributions:
            if year in investment_distribution.years:
                growth += investment_distribution.annual_growth(self.balance())
                break

        self.gains += growth

    def balance(self):
        return self.principal + self.gains

    def withdraw(self, amount: float) -> Withdrawal:
        if math.isclose(amount, 0):
            return Withdrawal(0.0, self.account_type)

        if self.balance() < amount:
            raise ValueError("Insufficient funds")

        proportion_of_balance_that_is_gains = self.gains / self.balance()
        gains_reduction = amount * proportion_of_balance_that_is_gains
        principal_reduction = amount * (1 - proportion_of_balance_that_is_gains)
        self.gains -= gains_reduction
        self.principal -= principal_reduction

        return Withdrawal(amount, self.account_type, capital_gains=gains_reduction)
