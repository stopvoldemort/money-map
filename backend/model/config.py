from typing import List
from model.tax_calculator import TaxBracket

class Config:
    def __init__(
            self,
            first_year: int,
            last_year: int,
            retirement_withdrawal_year: int,
            unscheduled_debt_interest_rate: float,
            maximum_bank_account_balance: float,
            inflation_rate: float,
            federal_standard_deduction: float,
            federal_tax_brackets: List[TaxBracket],
            state_standard_deduction: float,
            state_tax_brackets: List[TaxBracket],
            local_standard_deduction: float,
            local_tax_brackets: List[TaxBracket],
    ):
        self.first_year = first_year
        self.last_year = last_year
        self.retirement_withdrawal_year = retirement_withdrawal_year
        self.unscheduled_debt_interest_rate = unscheduled_debt_interest_rate
        self.maximum_bank_account_balance = maximum_bank_account_balance
        self.inflation_rate = inflation_rate
        self.federal_standard_deduction = federal_standard_deduction
        self.federal_tax_brackets = federal_tax_brackets
        self.state_standard_deduction = state_standard_deduction
        self.state_tax_brackets = state_tax_brackets
        self.local_standard_deduction = local_standard_deduction
        self.local_tax_brackets = local_tax_brackets
