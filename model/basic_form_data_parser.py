from model.account import Account
from model.account_type import AccountType
from model.debt import Debt
from model.asset import Asset
from model.expense import Expense
from model.income import Income
from model.investment_distribution import InvestmentDistribution
from model.investment_proportion import InvestmentProportion
from model.investment_vehicle import InvestmentVehicle
from model.transfer import Transfer
from model.gift import Gift
from model.scheduled_debt import ScheduledDebt
from model.house_purchase import HousePurchase
from model.form_data_parser import FormDataParser

from examples.default_data import (
    stocks,
    bonds,
    checking,
    money_market,
    bank_account_investment_plan_data,
    five_two_nine_investment_plan_data,
    regular_investment_plan_data,
    retirement_investment_plan_data,
)


class BasicFormDataParser:
    def parse_investment_distributions_data(self, investment_distributions_data):
        investment_distributions = []
        for investment_distribution_input in investment_distributions_data:
            investment_proportions = []
            parsed_years = FormDataParser.parse_years(
                investment_distribution_input.pop("years")
            )
            investment_proportions_input = investment_distribution_input.pop(
                "investment_proportions", []
            )

            for investment_proportion_input in investment_proportions_input:
                investment_vehicle = FormDataParser.find_object_by_name(
                    self.investment_vehicles,
                    investment_proportion_input.pop("investment_vehicle", None),
                )
                investment_proportions.append(
                    InvestmentProportion(
                        **investment_proportion_input,
                        investment_vehicle=investment_vehicle,
                    )
                )

            investment_distributions.append(
                InvestmentDistribution(
                    **investment_distribution_input,
                    years=parsed_years,
                    investment_proportions=investment_proportions,
                )
            )
        return investment_distributions

    def __init__(self, data: dict):
        self.data = data
        self.investment_vehicles = []
        self.accounts = []
        self.expenses = []
        self.incomes = []
        self.transfers = []
        self.debts = []
        self.assets = []
        self.gifts = []
        self.house_purchases = []

        for investment_vehicle_input in [stocks, bonds, checking, money_market]:
            self.investment_vehicles.append(
                InvestmentVehicle(**investment_vehicle_input)
            )

        for account_input in self.data["accounts"]:
            self.accounts.append(Account(**account_input))

        bank_account = FormDataParser.find_object_by_type(
            self.accounts, AccountType.BANK
        )
        invesment_account = FormDataParser.find_object_by_type(
            self.accounts, AccountType.INVESTMENT
        )
        retirement_account = FormDataParser.find_object_by_type(
            self.accounts, AccountType.RETIREMENT
        )
        five_two_nine_account = FormDataParser.find_object_by_type(
            self.accounts, AccountType.FIVE_TWO_NINE
        )

        bank_account.investment_distributions = (
            self.parse_investment_distributions_data(bank_account_investment_plan_data)
        )
        invesment_account.investment_distributions = (
            self.parse_investment_distributions_data(regular_investment_plan_data)
        )
        retirement_account.investment_distributions = (
            self.parse_investment_distributions_data(retirement_investment_plan_data)
        )
        five_two_nine_account.investment_distributions = (
            self.parse_investment_distributions_data(five_two_nine_investment_plan_data)
        )

        for debt_input in self.data["debts"]:
            self.debts.append(Debt(**debt_input))

        for scheduled_debt_input in self.data["scheduled_debts"]:
            first_year_of_loan = 2024
            loan_term_years = scheduled_debt_input.pop("remaining_loan_term", None)
            debt = Debt(**scheduled_debt_input, scheduled=True)
            transfers = ScheduledDebt.calculate_annual_interest_and_principal(
                debt=debt,
                loan_amount=debt.amount,
                annual_interest_rate=debt.aagr,
                first_year_of_loan=first_year_of_loan,
                loan_term_years=loan_term_years,
                pay_from_account=bank_account,
            )
            self.debts.append(debt)
            self.transfers.extend(transfers)

        for asset_input in self.data["assets"]:
            self.assets.append(Asset(**asset_input))

        for gift_input in self.data["gifts"]:
            account = FormDataParser.find_object_by_name(
                self.accounts, gift_input.pop("account", None)
            )
            years = FormDataParser.parse_years(gift_input.pop("years", []))
            for year in years:
                self.gifts.append(Gift(**gift_input, account=account, year=year))

        for expense_input in self.data["expenses"]:
            years = FormDataParser.parse_years(expense_input.pop("years", []))
            for year in years:
                self.expenses.append(Expense(**expense_input, year=year))

        for income_input in self.data["incomes"]:
            years = FormDataParser.parse_years(income_input.pop("years", []))
            for year in years:
                self.incomes.append(
                    Income(**income_input, year=year, deposit_in=bank_account)
                )

        for transfer_input in self.data["transfers"]:
            transfer_from = FormDataParser.find_object_by_name(
                self.accounts, transfer_input.pop("transfer_from", None)
            )
            transfer_to = FormDataParser.find_object_by_name(
                self.accounts, transfer_input.pop("transfer_to", None)
            )
            years = FormDataParser.parse_years(transfer_input.pop("years", []))
            for year in years:
                self.transfers.append(
                    Transfer(
                        **transfer_input,
                        year=year,
                        transfer_from=transfer_from,
                        transfer_to=transfer_to,
                    )
                )

        for house_purchase_input in self.data["house_purchases"]:
            house_asset, house_debt, house_expenses, house_transfers = HousePurchase(
                **house_purchase_input,
                mortgage_acct_src=bank_account,
                down_payment_acct_src=bank_account,
            ).execute()
            self.assets.append(house_asset)
            self.debts.append(house_debt)
            self.expenses.extend(house_expenses)
            self.transfers.extend(house_transfers)
