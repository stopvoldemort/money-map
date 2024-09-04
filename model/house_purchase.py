from typing import List
from typing import Tuple
from model.account import Account
from model.asset import Asset
from model.debt import Debt
from model.expense import Expense
from model.transfer import Transfer


class HousePurchase:
    def __init__(
        self,
        home_price: int,
        annual_interest_rate: float,
        year: int,
        last_year: int,
        down_payment_acct_src: Account,
        mortgage_acct_src: Account,
        down_payment_proportion: float = 0.2,
    ):
        self.home_price = home_price
        self.annual_interest_rate = annual_interest_rate
        self.year = year
        self.last_year = last_year
        self.down_payment_acct_src = down_payment_acct_src
        self.mortgage_acct_src = mortgage_acct_src
        self.loan_term_years = 30
        self.down_payment_proportion = down_payment_proportion
        self.tax_rate = 0.0071

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
        house = Asset("house", self.home_price, 0.01)
        debt = Debt("mortgage", self.home_price, 0.0, scheduled=True)

        expenses = []
        transfers = []

        # Expenses
        for y in range(self.year, self.last_year):
            expenses.append(
                Expense("property taxes", self.home_price * self.tax_rate, y)
            )

        # Values based mainly on NYTIMES buy vs rent calculator
        expenses.append(
            Expense("house closing costs", self.home_price * 0.04, self.year)
        )

        for y in range(self.year, self.last_year):
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
            self.year,
            transfer_from=self.down_payment_acct_src,
            transfer_to=debt,
            required=True,
        )
        transfers.append(down_payment)

        annual_breakdowns = self.calculate_annual_interest_and_principal(
            self.home_price - down_payment.amount
        )
        for i, (interest_paid, principal_paid) in enumerate(annual_breakdowns):
            y = self.year + i
            expenses.append(Expense(f"mortgage interest paid {y}", interest_paid, y))
            transfers.append(
                Transfer(
                    f"mortgage principal paid {y}",
                    principal_paid,
                    y,
                    transfer_from=self.mortgage_acct_src,
                    transfer_to=debt,
                    required=True,
                )
            )

        return house, debt, expenses, transfers

    # Returns a list of [[interest_paid, principal_paid], [...], ...] for each year.
    def calculate_annual_interest_and_principal(self, loan_amount) -> List[List[float]]:
        monthly_interest_rate = self.annual_interest_rate / 12

        # Total number of monthly payments
        total_payments = self.loan_term_years * 12

        # Monthly mortgage payment
        if monthly_interest_rate > 0:
            monthly_payment = (loan_amount * monthly_interest_rate) / (
                1 - (1 + monthly_interest_rate) ** -total_payments
            )
        else:
            monthly_payment = loan_amount / total_payments

        # Initialize balance
        balance = loan_amount
        annual_breakdowns = []

        for i in range(0, self.loan_term_years):
            interest_paid = 0
            principal_paid = 0

            for month in range(1, 13):
                interest_payment = balance * monthly_interest_rate
                principal_payment = monthly_payment - interest_payment
                balance -= principal_payment

                interest_paid += interest_payment
                principal_paid += principal_payment

            annual_breakdowns.append([interest_paid, principal_paid])

        return annual_breakdowns
