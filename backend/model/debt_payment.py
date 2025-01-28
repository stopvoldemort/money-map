from __future__ import annotations
from model.debt import Debt
from model.expense import Expense

class DebtPayment:
    def __init__(
        self,
        name: str,
        amount: float,
        year: int,
        debt: Debt,
    ):
        self.name = name
        self.amount = amount
        self.year = year
        self.debt = debt

    def execute(self) -> Expense:
        self.debt.pay(self.amount)
        return Expense(
            name=self.name,
            amount=self.amount,
            year=self.year,
            debt_payment=True,
        )

    def __repr__(self):
        return f"[{self.year}] {self.name}: {self.amount}, {self.debt.name}"
