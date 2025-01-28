from __future__ import annotations
# from model.account import Account
from model.withdrawal import Withdrawal


class Transfer:
    def __init__(
        self,
        name: str,
        amount: float,
        year: int,
        transfer_from, # Account,
        transfer_to, # Account,
    ):
        self.name = name
        self.amount = amount
        self.transfered_amount = 0.0
        self.year = year
        self.transfer_from = transfer_from
        self.transfer_to = transfer_to

    def execute(self) -> Withdrawal:
        withdrawal_amount = min(self.transfer_from.balance(), self.amount)
        withdrawal = self.transfer_from.withdraw(withdrawal_amount)
        self.transfer_to.deposit(withdrawal_amount)

        return withdrawal

    def __repr__(self):
        return f"{self.name}: {self.amount}, {self.transfer_from.name}, {self.transfer_to.name}"
