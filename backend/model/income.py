from model.account import Account


class Income:
    def __init__(
        self,
        name: str,
        amount: float,
        year: int,
        deposit_in: Account,
        federal_income_tax: bool = True,
        payroll_tax: bool = True,
        state_income_tax: bool = True,
        local_income_tax: bool = True,
    ):
        self.name = name
        self.amount = amount
        self.year = year
        self.federal_income_tax = federal_income_tax
        self.payroll_tax = payroll_tax
        self.state_income_tax = state_income_tax
        self.local_income_tax = local_income_tax
        self.deposit_in = deposit_in
