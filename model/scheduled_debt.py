from typing import List
from model.transfer import Transfer


# This class is responsible for calculating the annual interest and principal payments for a scheduled debt.
# It's not an actual model. It's a utility class that is used by the Debt class.
class ScheduledDebt:
    @staticmethod
    def calculate_annual_interest_and_principal(
        debt,
        loan_amount,
        annual_interest_rate,
        first_year_of_loan,
        loan_term_years,
        pay_from_account,
    ) -> List[Transfer]:
        # Total cost of the mortgage
        if annual_interest_rate > 0:
            number_of_payments = loan_term_years * 12
            monthly_interest_rate = annual_interest_rate / 12
            total_cost = loan_amount * (1 + monthly_interest_rate) ** number_of_payments
        else:
            total_cost = loan_amount

        # Annual mortgage payment
        annual_payment = total_cost / loan_term_years

        # Initialize balance
        transfers = []

        for year in range(first_year_of_loan, first_year_of_loan + loan_term_years):
            transfers.append(
                Transfer(
                    f"{debt.name} scheduled payment {year}",
                    annual_payment,
                    year,
                    transfer_from=pay_from_account,
                    transfer_to=debt,
                    required=True,
                )
            )

        return transfers
