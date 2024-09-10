from typing import List
from typing import Tuple
from model.account import Account
from model.asset import Asset
from model.debt import Debt
from model.scheduled_debt import ScheduledDebt
from model.expense import Expense
from model.transfer import Transfer


class HousePurchase:
    def __init__(
        self,
        home_price: int,
        annual_interest_rate: float,
        first_year: int,
        loan_term_years: int,
        last_year: int,
        mortgage_acct_src: Account,
        down_payment_acct_src: Account,
        down_payment_proportion: float,
        property_tax_rate: float,
    ):
        self.home_price = home_price
        self.annual_interest_rate = annual_interest_rate
        self.first_year = first_year
        self.loan_term_years = loan_term_years
        self.last_year = last_year
        self.down_payment_acct_src = down_payment_acct_src
        self.mortgage_acct_src = mortgage_acct_src
        self.down_payment_proportion = down_payment_proportion
        self.property_tax_rate = property_tax_rate

    # Return values:
    # - Assets
    #   - The value of the house
    # - Expenses:
    #   - Closing costs (once)
    #   - Property taxes (forever, 0.71% of value) (how does tax assessment work?)
    #   - Interest portion of mortgage payment (need to figure out when/how to deduct from federal taxable income) (30 years)
    # - Transfers
    #   - Down payment (transfer_from=[boa, vanguard], transfer_to=debt)
    #   - Annual paydowns of the mortgage principal (transfer_from=[boa, vanguard], transfer_to=debt)
    # - Debts:
    #   - The house price
    def execute(self) -> Tuple[Asset, Debt, List[Expense], List[Transfer]]:
        house = Asset("house", self.home_price, 0.01, self.property_tax_rate)
        debt = Debt("mortgage", self.home_price, 0.0, scheduled=True)

        expenses = []
        transfers = []

        # EXPENSES
        # Values based mainly on NYTIMES buy vs rent calculator
        expenses.append(
            Expense("house closing costs", self.home_price * 0.04, self.first_year)
        )

        for y in range(self.first_year, self.last_year + 1):
            expenses.append(
                Expense(
                    f"maintenance, insurance, extra utilities {y}",
                    self.home_price * 0.0155 + 1200,
                    y,
                )
            )

        down_payment = Transfer(
            "down payment",
            self.home_price * self.down_payment_proportion,
            self.first_year,
            transfer_from=self.down_payment_acct_src,
            transfer_to=debt,
            required=True,
        )
        transfers.append(down_payment)

        mortgage_transfers = ScheduledDebt.calculate_annual_interest_and_principal(
            debt=debt,
            loan_amount=self.home_price - down_payment.amount,
            annual_interest_rate=self.annual_interest_rate,
            first_year_of_loan=self.first_year,
            loan_term_years=self.loan_term_years,
            pay_from_account=self.mortgage_acct_src,
        )

        transfers.extend(mortgage_transfers)

        return house, debt, expenses, transfers
