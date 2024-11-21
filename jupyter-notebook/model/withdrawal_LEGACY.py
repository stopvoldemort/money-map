class Withdrawal:
    def __init__(self, amount: float, tax_type: str, capital_gains: float = 0.0):
        self.amount = amount
        self.tax_type = tax_type
        self.capital_gains = capital_gains
