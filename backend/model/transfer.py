from typing import Tuple, Optional
from model.account import Account
from model.debt import Debt
from model.expense import Expense
from model.withdrawal import Withdrawal


class Transfer:
    def __init__(
        self,
        name: str,
        amount: float,
        year: int,
        transfer_from: Account,
        transfer_to: Account | Debt,
        required: bool = False,
    ):
        self.name = name
        self.amount = amount
        self.transfered_amount = 0.0
        self.year = year
        self.transfer_from = transfer_from
        self.transfer_to = transfer_to
        self.required = required

    # If there is not enough in the transfer_from account and the full amount is required, returns an
    # expense to cover the difference
    def execute(self) -> Tuple[Withdrawal, Optional[Expense]]:
        expense = None
        withdrawal = None

        # This is just to make sure that we don't pay more than the debt balance
        if self.is_debt_transfer() and self.amount > self.transfer_to.amount:
            self.amount = self.transfer_to.amount

        if self.transfer_from.balance() < self.amount and self.required:
            withdrawal_amount = self.transfer_from.balance()
            expense = Expense(
                f"insufficient funds for {self.name}",
                self.amount - withdrawal_amount,
                self.year,
            )
            withdrawal = self.transfer_from.withdraw(withdrawal_amount)
            self.execute_transfer_to(self.amount)
        else:
            withdrawal_amount = min(self.transfer_from.balance(), self.amount)
            withdrawal = self.transfer_from.withdraw(withdrawal_amount)
            self.execute_transfer_to(withdrawal_amount)

        return withdrawal, expense

    def execute_transfer_to(self, amount):
        if self.is_debt_transfer():
            self.transfer_to.pay(amount)
        else:
            self.transfer_to.deposit(amount)

        self.transfered_amount = amount

    def is_debt_transfer(self):
        return isinstance(self.transfer_to, Debt)
