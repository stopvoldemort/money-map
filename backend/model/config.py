class Config:
    def __init__(self, first_year: int, last_year: int, retirement_withdrawal_year: int, unscheduled_debt_interest_rate: float, maximum_bank_account_balance: float):
        self.first_year = first_year
        self.last_year = last_year
        self.retirement_withdrawal_year = retirement_withdrawal_year
        self.unscheduled_debt_interest_rate = unscheduled_debt_interest_rate
        self.maximum_bank_account_balance = maximum_bank_account_balance
