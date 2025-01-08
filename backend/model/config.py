from typing import List


class Config:
    def __init__(
            self,
            first_year: int,
            last_year: int,
            retirement_withdrawal_year: int,
            unscheduled_debt_interest_rate: float,
            maximum_bank_account_balance: float,
            inflation_rate: float,
            state_tax_brackets: List[List[float]],
            state_standard_deduction: float,
            local_tax_brackets: List[List[float]],
            local_standard_deduction: float,
    ):
        self.first_year = first_year
        self.last_year = last_year
        self.retirement_withdrawal_year = retirement_withdrawal_year
        self.unscheduled_debt_interest_rate = unscheduled_debt_interest_rate
        self.maximum_bank_account_balance = maximum_bank_account_balance
        self.inflation_rate = inflation_rate
        self.state_tax_brackets = state_tax_brackets
        self.state_standard_deduction = state_standard_deduction
        self.local_tax_brackets = local_tax_brackets
        self.local_standard_deduction = local_standard_deduction
