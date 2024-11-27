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

    def for_frontend(self):
        result = []
        # Assuming all lists have the same length and represent data for consecutive years
        for i in range(len(self.net_worth[0])):
            year_data = {
                "year": 2025 + i,  # Assuming starting year is 2024
                "net_worth": self.net_worth[0][i],
                "assets": self.assets[0][i],
                "income": self.income[0][i],
                "investment_gains": self.investment_gains[0][i],
                "expenses": self.expenses[0][i],
                "taxes": self.taxes[0][i],
                "retirement": self.retirement[0][i],
                "roth_ira": self.roth_ira[0][i],
                "investment": self.investment[0][i],
                "five_two_nine": self.five_two_nine[0][i],
                "bank_account": self.bank_account[0][i],
                "debt": self.debt[0][i]
            }
            result.append(year_data)
        return result
