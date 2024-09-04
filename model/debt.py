class Debt:
    def __init__(
        self,
        name: str,
        amount: float,
        aagr: float,
        scheduled: bool = False,
        five_two_nine_eligible: bool = False,
    ):
        self.name = name
        self.amount = amount
        self.aagr = aagr
        self.scheduled = scheduled
        self.five_two_nine_eligible = five_two_nine_eligible

    def pay(self, payment_amount: float):
        self.amount -= payment_amount

    def add(self, amount: float) -> float:
        self.amount += amount

    def apply_annual_growth(self):
        self.amount *= 1 + self.aagr
