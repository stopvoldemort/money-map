from model.account_LEGACY import Account


class Gift:
    def __init__(self, name: str, amount: float, year: int, account: Account):
        self.name = name
        self.amount = amount
        self.year = year
        self.account = account

    def receive(self):
        self.account.deposit(self.amount)
