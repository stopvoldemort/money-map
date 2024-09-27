class Aggregator:
    def __init__(self):
        self.net_worth = []
        self.assets = []
        self.income = []
        self.investment_gains = []
        self.expenses = []
        self.taxes = []
        self.retirement = []
        self.roth_ira = []
        self.investment = []
        self.five_two_nine = []
        self.bank_account = []
        self.debt = []

    def append(self, another_aggregator: "Aggregator") -> "Aggregator":
        self.net_worth.append(another_aggregator.net_worth)
        self.income.append(another_aggregator.income)
        self.investment_gains.append(another_aggregator.investment_gains)
        self.expenses.append(another_aggregator.expenses)
        self.taxes.append(another_aggregator.taxes)
        self.retirement.append(another_aggregator.retirement)
        self.roth_ira.append(another_aggregator.roth_ira)
        self.investment.append(another_aggregator.investment)
        self.five_two_nine.append(another_aggregator.five_two_nine)
        self.bank_account.append(another_aggregator.bank_account)
        self.debt.append(another_aggregator.debt)
        self.assets.append(another_aggregator.assets)
        return self
