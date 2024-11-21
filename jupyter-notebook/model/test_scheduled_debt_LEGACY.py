import unittest
from model.expense_LEGACY import Expense
from model.transfer_LEGACY import Transfer
from model.scheduled_debt_LEGACY import ScheduledDebt


class MockDebt:
    def __init__(self, name):
        self.name = name


class MockAccount:
    def __init__(self, name):
        self.name = name


class TestScheduledDebt(unittest.TestCase):
    def setUp(self):
        self.debt = MockDebt("Test Debt")
        self.account = MockAccount("Test Account")

    def test_calculate_annual_interest_and_principal_zero_interest(self):
        loan_amount = 1000
        annual_interest_rate = 0.0
        first_year_of_loan = 2023
        loan_term_years = 5

        principal_payments, interest_payments = (
            ScheduledDebt.calculate_annual_interest_and_principal(
                self.debt,
                loan_amount,
                annual_interest_rate,
                first_year_of_loan,
                loan_term_years,
                self.account,
            )
        )

        self.assertEqual(len(principal_payments), loan_term_years)
        self.assertEqual(len(interest_payments), loan_term_years)

        for i in range(loan_term_years):
            self.assertEqual(
                principal_payments[i].amount, loan_amount / loan_term_years
            )
            self.assertEqual(interest_payments[i].amount, 0)

    def test_calculate_annual_interest_and_principal_positive_interest(self):
        loan_amount = 1000
        annual_interest_rate = 0.05
        first_year_of_loan = 2023
        loan_term_years = 5

        principal_payments, interest_payments = (
            ScheduledDebt.calculate_annual_interest_and_principal(
                self.debt,
                loan_amount,
                annual_interest_rate,
                first_year_of_loan,
                loan_term_years,
                self.account,
            )
        )

        self.assertEqual(len(principal_payments), loan_term_years)
        self.assertEqual(len(interest_payments), loan_term_years)

        balance = loan_amount
        for i in range(loan_term_years):
            interest_payment = balance * annual_interest_rate
            total_cost = loan_amount * (1 + annual_interest_rate) ** loan_term_years
            annual_payment = total_cost / loan_term_years
            principal_payment = annual_payment - interest_payment
            balance -= principal_payment

            # add a debugger
            # import pdb

            # pdb.set_trace()

            self.assertAlmostEqual(
                principal_payments[i].amount, principal_payment, places=2
            )
            self.assertAlmostEqual(
                interest_payments[i].amount, interest_payment, places=2
            )


if __name__ == "__main__":
    unittest.main()
