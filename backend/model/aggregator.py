class Aggregator:
    def __init__(self, first_year: int):
        self.first_year = first_year
        self.net_worth = []
        self.assets = []
        self.retirement = []
        self.roth_ira = []
        self.investment = []
        self.five_two_nine = []
        self.bank_account = []
        self.debt = []

    def append(self, another_aggregator: "Aggregator") -> "Aggregator":
        self.net_worth.append(another_aggregator.net_worth)
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
        for i in range(len(self.net_worth)):
            year_data = {
                "year": self.first_year + i,
                "net_worth": self.net_worth[i],
                "assets": self.assets[i],
                "retirement": self.retirement[i],
                "roth_ira": self.roth_ira[i],
                "investment": self.investment[i],
                "five_two_nine": self.five_two_nine[i],
                "bank_account": self.bank_account[i],
                "debt": self.debt[i]
            }
            result.append(year_data)
        return result
