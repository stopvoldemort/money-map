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
        number_of_months = loan_term_years * 12
        if annual_interest_rate > 0:
            monthly_payment = (
                loan_amount
                * (annual_interest_rate / 12)
                * (1 + annual_interest_rate / 12) ** (number_of_months)
                / ((1 + annual_interest_rate / 12) ** (number_of_months) - 1)
            )

        else:
            monthly_payment = loan_amount / (number_of_months)

        annual_payment = monthly_payment * 12

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
