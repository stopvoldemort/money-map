from __future__ import annotations
from typing import Tuple
from model.account import Account
from model.expense import Expense
from model.income import Income

class Asset:
    def __init__(self, name: str, value: float, aagr: float, tax_rate: float, sell_on: int=0, sales_taxes_amount: float=0.0, deposit_sales_proceeds_in: Account=None):
        self.name = name
        self.value = value
        self.aagr = aagr
        self.tax_rate = tax_rate
        self.sell_on = sell_on
        self.deposit_sales_proceeds_in = deposit_sales_proceeds_in
        self.sales_taxes_amount = sales_taxes_amount

        # This is used to track the growth of the account over the year
        self.annual_growth = 0.0

    def apply_annual_growth(self):
        self.annual_growth = self.value * self.aagr
        self.value += self.annual_growth

    def annual_tax_bill(self):
        return self.value * self.tax_rate

    def sell(self) -> Tuple[Income, Expense]:
        income = Income(
            name=f"sell {self.name}",
            amount=self.value,
            year=self.sell_on,
            deposit_in=self.deposit_sales_proceeds_in,
            federal_income_tax=False,
            payroll_tax=False,
            state_income_tax=False,
            local_income_tax=False,
        )

        expense = Expense(
            name=f"sales taxes on {self.name}",
            amount=self.sales_taxes_amount,
            year=self.sell_on,
        )

        self.value = 0.0
        return income, expense
