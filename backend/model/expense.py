class Expense:
    def __init__(
        self,
        name: str,
        amount: float,
        year: int,
        five_two_nine_eligible: bool = False,
        tax_payment: bool = False,
    ):
        self.name = name
        self.amount = amount
        self.starting_amount = amount
        self.year = year
        self.five_two_nine_eligible = five_two_nine_eligible
        self.tax_payment = tax_payment

    def pay(self, payment_amount: float):
        self.amount -= payment_amount
