from typing import List, Tuple
from model.transfer import Transfer
from model.debt import Debt

# This class is responsible for calculating the annual interest and principal payments for a scheduled debt.
# It's not an actual model. It's a utility class.
class ScheduledDebt:
    @staticmethod
    def generate_debt_and_debt_payments(
        name,
        total_amount,
        down_payment_proportion,
        annual_interest_rate,
        first_year_of_loan,
        loan_term_years,
        pay_from_account,
        inflation_rate,
    ) -> Tuple[Debt, List[Transfer]]:
        down_payment_amount = total_amount * down_payment_proportion
        loan_amount = total_amount - down_payment_amount

        debt = Debt(name, total_amount, annual_interest_rate, scheduled=True)

        transfers = [
            Transfer(
                name=f"{name} down payment",
                amount=down_payment_amount,
                year=first_year_of_loan,
                transfer_from=pay_from_account,
                transfer_to=debt,
                required=True,
            )
        ]

        if annual_interest_rate > 0:
            annual_payment = (
                loan_amount
                * annual_interest_rate
                * (1 + annual_interest_rate) ** loan_term_years
                / ((1 + annual_interest_rate) ** loan_term_years - 1)
            )

        else:
            annual_payment = loan_amount / loan_term_years

        for year in range(first_year_of_loan, first_year_of_loan + loan_term_years):
            deflator = (1 + inflation_rate) ** (year - first_year_of_loan)
            annual_payment_current_dollars = annual_payment / deflator
            transfers.append(
                Transfer(
                    name=f"{year} scheduled payment for {debt.name}",
                    amount=annual_payment_current_dollars,
                    year=year,
                    transfer_from=pay_from_account,
                    transfer_to=debt,
                    required=True,
                )
            )

        return debt,transfers
