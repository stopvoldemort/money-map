from typing import List
import math
from model.account_type import AccountType
from model.investment_distribution import InvestmentDistribution
from model.withdrawal import Withdrawal


class Account:
    def __init__(
        self,
        name: str,
        account_type: str,
        starting_balance: float,
        investment_distributions: List[InvestmentDistribution] = [],
        earliest_withdrawal_year: int = 0,
    ):
        self.name = name
        self.account_type = AccountType(account_type)
        self.investment_distributions = investment_distributions
        self.earliest_withdrawal_year = earliest_withdrawal_year
        self.principal = starting_balance
        self.gains = 0.0

        # This is used to track the growth of the account over the year
        self.annual_growth = 0.0

    def deposit(self, amount: float):
        self.principal += amount

    def apply_annual_growth(self, year: int) -> float:
        self.annual_growth = 0

        for investment_distribution in self.investment_distributions:
            if year in investment_distribution.years:
                self.annual_growth += investment_distribution.annual_growth(
                    self.balance()
                )
                break

        self.gains += self.annual_growth

    def balance(self):
        return self.principal + self.gains

    def withdraw(self, amount: float) -> Withdrawal:
        if math.isclose(amount, 0):
            return Withdrawal(
                amount=0.0, tax_type=self.account_type.withdrawal_tax_treatment
            )

        if self.balance() < amount:
            raise ValueError("Insufficient funds")

        proportion_of_balance_that_is_gains = self.gains / self.balance()
        gains_reduction = amount * proportion_of_balance_that_is_gains
        principal_reduction = amount * (1 - proportion_of_balance_that_is_gains)
        self.gains -= gains_reduction
        self.principal -= principal_reduction

        return Withdrawal(
            amount=amount,
            tax_type=self.account_type.withdrawal_tax_treatment,
            capital_gains=gains_reduction,
        )
