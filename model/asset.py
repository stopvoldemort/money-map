from model.expense import Expense


class Asset:
    def __init__(self, name: str, value: float, aagr: float, tax_rate: float):
        self.name = name
        self.value = value
        self.aagr = aagr
        self.tax_rate = tax_rate

        # This is used to track the growth of the account over the year
        self.annual_growth = 0.0

    def apply_annual_growth(self):
        self.annual_growth = self.value * self.aagr
        self.value += self.annual_growth

    def annual_tax_bill(self):
        return self.value * self.tax_rate
