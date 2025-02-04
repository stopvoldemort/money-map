from typing import List
from typing import Tuple
from model.account import Account
from model.asset import Asset
from model.debt import Debt
from model.expense import Expense
from model.debt_payment import DebtPayment
from model.scheduled_debt import ScheduledDebt

class HousePurchase:
    def __init__(
        self,
        name: str,
        home_price: int,
        closing_costs_proportion: float,
        annual_insurance_rate: float,
        annual_upkeep_cost: float,
        annual_interest_rate: float,
        aagr: float,
        first_year: int,
        loan_term_years: int,
        down_payment_proportion: float,
        property_tax_rate: float,
        inflation_rate: float,
    ):
        self.name = name
        self.home_price = home_price
        self.closing_costs_proportion = closing_costs_proportion
        self.annual_insurance_rate = annual_insurance_rate
        self.annual_upkeep_cost = annual_upkeep_cost
        self.annual_interest_rate = annual_interest_rate
        self.aagr = aagr
        self.first_year = first_year
        self.loan_term_years = loan_term_years
        self.down_payment_proportion = down_payment_proportion
        self.property_tax_rate = property_tax_rate
        self.inflation_rate = inflation_rate
    # Return values:
    # - Assets
    #   - The value of the house
    # - Expenses:
    #   - Closing costs (once)
    #   - Property taxes (annual)
    #   - Upkeep (annual)
    #   - Insurance (annual)
    # - Debt payments:
    #   - Down payment
    #   - Annual paydowns of the mortgage principal
    # - Debts:
    #   - The house price, which increases by the AAGR
    def execute(self) -> Tuple[Asset, Debt, List[Expense], List[DebtPayment]]:
        house = Asset(self.name, self.home_price, self.aagr, self.property_tax_rate)
        expenses = []

        # EXPENSES
        expenses.append(
            Expense(f"{self.name} closing costs", self.closing_costs_proportion * self.home_price, self.first_year)
        )

        for y in range(self.first_year, 2070 + 1):
            upkeep = Expense(f"{self.name} upkeep", self.annual_upkeep_cost, y)
            insurance = Expense(f"{self.name} insurance", self.home_price * self.annual_insurance_rate, y)
            expenses.extend([upkeep, insurance])

        debt, debt_payments = ScheduledDebt.generate_debt_and_debt_payments(
            name=self.name,
            total_amount=self.home_price,
            down_payment_proportion=self.down_payment_proportion,
            annual_interest_rate=self.annual_interest_rate,
            first_year_of_loan=self.first_year,
            loan_term_years=self.loan_term_years,
            inflation_rate=self.inflation_rate,
        )

        return house, debt, expenses, debt_payments
