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
        self.expenses = []
        self.debt_payments = []
        self.taxes = []
        self.incomes = []

    def for_frontend(self):
        data = []
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
                "debt": self.debt[i],
                "expenses": self.expenses[i],
                "debt_payments": self.debt_payments[i],
                "taxes": self.taxes[i],
                "incomes": self.incomes[i],
            }
            data.append(year_data)
        return data
