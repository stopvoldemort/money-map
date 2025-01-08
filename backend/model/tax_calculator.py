from typing import List

from logger import get_logger

class TaxBracket:
    def __init__(self, rate: float, lower_bound: float, upper_bound: float):
        self.rate = rate
        self.lower_bound = lower_bound
        self.upper_bound = upper_bound


class TaxCalculator:
    def __init__(self, state_tax_brackets: List[TaxBracket], state_standard_deduction: float, local_tax_brackets: List[TaxBracket], local_standard_deduction: float):
        self.state_tax_brackets = state_tax_brackets
        self.state_standard_deduction = state_standard_deduction
        self.local_tax_brackets = local_tax_brackets
        self.local_standard_deduction = local_standard_deduction
        self.federal_tax_brackets = [
            TaxBracket(0.1, 0.0, 23200.0),
            TaxBracket(0.12, 23200.0, 94300.0),
            TaxBracket(0.22, 94301.0, 201050.0),
            TaxBracket(0.24, 201051.0, 383900.0),
            TaxBracket(0.32, 383901.0, 487450.0),
            TaxBracket(0.35, 487451.0, 731200.0),
            TaxBracket(0.37, 731201.0, float("inf")),
        ]
        self.federal_standard_deduction = 29200.0
        self.payroll_tax_brackets = [
            TaxBracket(0.0765, 0.0, 168600.0),
            TaxBracket(0.0235, 168601.0, 200000.0),
            TaxBracket(0.009, 200001.0, float("inf")),
        ]
        self.payroll_standard_deduction = 0.0

        # get_logger().info(f"state_tax_brackets: {self.state_tax_brackets}")
        # get_logger().info(f"state_standard_deduction: {self.state_standard_deduction}")
        # get_logger().info(f"local_tax_brackets: {self.local_tax_brackets}")
        # get_logger().info(f"local_standard_deduction: {self.local_standard_deduction}")

    def capital_gains_tax_rate(self):
        return 0.15

    def calculate_state_income_tax(self, income: float) -> float:
        return self.calculate_tax(income, self.state_standard_deduction, self.state_tax_brackets)

    def calculate_local_income_tax(self, income: float) -> float:
        return self.calculate_tax(income, self.local_standard_deduction, self.local_tax_brackets)


    def calculate_payroll_tax(self, income: float) -> float:
        return self.calculate_tax(income, self.payroll_standard_deduction, self.payroll_tax_brackets)

    def calculate_federal_income_tax(self, income: float) -> float:
        return self.calculate_tax(
            income, self.federal_standard_deduction, self.federal_tax_brackets
        )

    def calculate_tax(self, income: float, deduction: float, tax_brackets: List[TaxBracket]) -> float:
        taxable_income = income - deduction
        if taxable_income <= 0:
            return 0

        tax_owed = 0

        for bracket in tax_brackets:
            if taxable_income < bracket.lower_bound: # Income is below the lower bound of the bracket
                break
            elif taxable_income > bracket.upper_bound: # Income is above the upper bound of the bracket
                tax_owed += bracket.rate * (bracket.upper_bound - bracket.lower_bound)
            else:   # Income is within the bracket
                tax_owed += bracket.rate * (taxable_income - bracket.lower_bound)
                break

        return tax_owed
