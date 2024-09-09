from model.expense import Expense


class Asset:
    def __init__(self, name: str, value: float, aagr: float, tax_rate: float):
        self.name = name
        self.value = value
        self.aagr = aagr
        self.tax_rate = tax_rate

    def apply_annual_growth(self):
        self.value += self.value * self.aagr

    def annual_tax_bill(self):
        return self.value * self.tax_rate
