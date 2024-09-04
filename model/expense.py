class Expense:
    def __init__(
        self, name: str, amount: float, year: int, five_two_nine_eligible: bool = False
    ):
        self.name = name
        self.amount = amount
        self.year = year
        self.five_two_nine_eligible = five_two_nine_eligible

    def pay(self, payment_amount: float):
        self.amount -= payment_amount
