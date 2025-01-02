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

        # This is used to track the growth of the account over the year
        self.growth = 0.0

    def pay(self, payment_amount: float):
        self.amount -= payment_amount

    def add(self, amount: float) -> float:
        self.amount += amount

    def apply_annual_growth(self, inflation_rate: float):
        self.growth = self.amount * self.aagr
        self.amount += self.growth

        self.amount = self.amount / (1 + inflation_rate)


    def __repr__(self):
        return f"{self.name}: {self.amount}, {self.aagr}, {self.scheduled}"
