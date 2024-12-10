from typing import List


class TaxCalculator:
    def capital_gains_tax_rate(self):
        return 0.15

    def calculate_state_income_tax(self, income: float) -> float:
        ny_tax_brackets = [
            [0.0, 0.0],
            [0.04, 17150.0],
            [0.045, 23600.0],
            [0.0525, 27900.0],
            [0.055, 161550.0],
            [0.06, 323200.0],
            [0.0685, 2155350.0],
            [0.0965, 5000000.0],
            [0.103, 25000000.0],
            [0.109, float("inf")],
        ]
        ny_standard_deduction = 16050.0
        return self.calculate_tax(income, ny_standard_deduction, ny_tax_brackets)

    def calculate_payroll_tax(self, income: float) -> float:
        payroll_tax_brackets = [
            [0.0765, 0.0],
            [0.0145, 160000.0],
            [0.0235, float("inf")],
        ]
        payroll_standard_deduction = 0.0
        return self.calculate_tax(
            income, payroll_standard_deduction, payroll_tax_brackets
        )

    def calculate_federal_income_tax(self, income: float) -> float:
        federal_tax_brackets = [
            [0.0, 0.0],
            [0.1, 22000.0],
            [0.12, 89450.0],
            [0.22, 190750.0],
            [0.24, 364200.0],
            [0.32, 462500.0],
            [0.35, 693650.0],
            [0.37, float("inf")],
        ]
        federal_standard_deduction = 29200.0
        return self.calculate_tax(
            income, federal_standard_deduction, federal_tax_brackets
        )

    def calculate_local_income_tax(self, income: float) -> float:
        nyc_tax_brackets = [
            [0.0, 0.0],
            [0.03078, 21600.0],
            [0.03762, 45000.0],
            [0.03819, 90000.0],
            [0.03876, float("inf")],
        ]
        nyc_standard_deduction = 16050.0
        return self.calculate_tax(income, nyc_standard_deduction, nyc_tax_brackets)

    def calculate_tax(
        self, income: str, deduction: str, tax_brackets: List[List[float]]
    ) -> float:
        taxable_income = income - deduction
        tax_owed = 0
        for bracket in tax_brackets:
            rate, threshold = bracket
            if taxable_income <= 0:
                break
            elif taxable_income <= threshold:
                tax_owed += taxable_income * rate
                break
            else:
                tax_owed += threshold * rate
                taxable_income -= threshold

        return tax_owed
