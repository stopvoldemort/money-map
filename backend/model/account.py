from __future__ import annotations
from typing import List
import math
from model.investment_vehicle import InvestmentVehicle
from model.account_type import AccountType
from model.annual_investment_allocation import AnnualInvestmentAllocation
from model.withdrawal import Withdrawal
from model.transfer import Transfer

class Account:
    def __init__(
        self,
        name: str,
        account_type: str,
        starting_balance: float,
        annual_investment_allocations: List[AnnualInvestmentAllocation] = [],
        earliest_withdrawal_year: int = 0,
        maximum_balance: float = float("inf"),
        syphon_excess_to: Account = None,
    ):
        self.name = name
        self.account_type = AccountType(account_type)
        self.annual_investment_allocations = annual_investment_allocations
        self.earliest_withdrawal_year = earliest_withdrawal_year
        self.principal = starting_balance
        self.maximum_balance = maximum_balance
        self.syphon_excess_to = syphon_excess_to
        self.gains = 0.0
        # This is used to track the growth of the account over the year
        self.annual_growth = 0.0

    def deposit(self, amount: float):
        self.principal += amount

    def apply_annual_growth(self, year: int, investment_vehicles: List[InvestmentVehicle]) -> float:
        self.annual_growth = 0

        for investment_distribution in self.annual_investment_allocations:
            if year == investment_distribution.year:
                self.annual_growth += investment_distribution.annual_growth(
                    self.balance(), investment_vehicles
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

    def rebalance(self, year: int) -> Withdrawal:
        if self.balance() > self.maximum_balance:
            transfer = Transfer(
                name=f"rebalance {self.name} to {self.syphon_excess_to.name}",
                year=year,
                transfer_from=self,
                transfer_to=self.syphon_excess_to,
                amount=self.balance() - self.maximum_balance,
            )
            return transfer.execute()
        return None
