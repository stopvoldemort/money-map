from typing import List, Tuple
from model.debt_payment import DebtPayment
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
        inflation_rate,
    ) -> Tuple[Debt, List[DebtPayment]]:
        down_payment_amount = total_amount * down_payment_proportion
        loan_amount = total_amount - down_payment_amount

        debt = Debt(name, total_amount, annual_interest_rate, scheduled=True)

        debt_payments = [
            DebtPayment(
                name=f"{name} down payment",
                amount=down_payment_amount,
                year=first_year_of_loan,
                debt=debt,
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
            debt_payments.append(
                DebtPayment(
                    name=f"{year} scheduled payment for {debt.name}",
                    amount=annual_payment_current_dollars,
                    year=year,
                    debt=debt,
                )
            )

        return debt, debt_payments
