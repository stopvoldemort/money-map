from model.account import Account
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


class FormDataParser:
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

        for investment_vehicle_input in self.data["investment_vehicles"]:
            self.investment_vehicles.append(
                InvestmentVehicle(**investment_vehicle_input)
            )

        for account_input in self.data["accounts"]:
            investment_distributions = []
            investment_distributions_input = account_input.pop(
                "investment_distributions", []
            )

            for investment_distribution_input in investment_distributions_input:
                investment_proportions = []
                parsed_years = self.parse_years(
                    investment_distribution_input.pop("years")
                )
                investment_proportions_input = investment_distribution_input.pop(
                    "investment_proportions", []
                )

                for investment_proportion_input in investment_proportions_input:
                    investment_vehicle = self.find_object_by_name(
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

            self.accounts.append(
                Account(
                    **account_input, investment_distributions=investment_distributions
                )
            )

        for debt_input in self.data["debts"]:
            self.debts.append(Debt(**debt_input))

        for scheduled_debt_input in self.data["scheduled_debts"]:
            pay_from_account = self.find_object_by_name(
                self.accounts, scheduled_debt_input.pop("pay_from_account", None)
            )
            first_year_of_loan = 2024
            loan_term_years = scheduled_debt_input.pop("remaining_loan_term", None)
            debt = Debt(**scheduled_debt_input, scheduled=True)
            transfers = ScheduledDebt.calculate_annual_interest_and_principal(
                debt=debt,
                loan_amount=debt.amount,
                annual_interest_rate=debt.aagr,
                first_year_of_loan=first_year_of_loan,
                loan_term_years=loan_term_years,
                pay_from_account=pay_from_account,
            )
            self.debts.append(debt)
            self.transfers.extend(transfers)

        for asset_input in self.data["assets"]:
            self.assets.append(Asset(**asset_input))

        for gift_input in self.data["gifts"]:
            account = self.find_object_by_name(
                self.accounts, gift_input.pop("account", None)
            )
            years = self.parse_years(gift_input.pop("years", []))
            for year in years:
                self.gifts.append(Gift(**gift_input, account=account, year=year))

        for expense_input in self.data["expenses"]:
            years = self.parse_years(expense_input.pop("years", []))
            for year in years:
                self.expenses.append(Expense(**expense_input, year=year))

        for income_input in self.data["incomes"]:
            deposit_in = self.find_object_by_name(
                self.accounts, income_input.pop("deposit_in", None)
            )
            years = self.parse_years(income_input.pop("years", []))
            for year in years:
                self.incomes.append(
                    Income(**income_input, year=year, deposit_in=deposit_in)
                )

        for transfer_input in self.data["transfers"]:
            transfer_from = self.find_object_by_name(
                self.accounts, transfer_input.pop("transfer_from", None)
            )
            transfer_to = self.find_object_by_name(
                self.accounts, transfer_input.pop("transfer_to", None)
            )
            years = self.parse_years(transfer_input.pop("years", []))
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
            mortgage_acct_src = self.find_object_by_name(
                self.accounts, house_purchase_input.pop("mortgage_acct_src", None)
            )
            down_payment_acct_src = self.find_object_by_name(
                self.accounts, house_purchase_input.pop("down_payment_acct_src", None)
            )
            house_asset, house_debt, house_expenses, house_transfers = HousePurchase(
                **house_purchase_input,
                mortgage_acct_src=mortgage_acct_src,
                down_payment_acct_src=down_payment_acct_src,
            ).execute()
            self.assets.append(house_asset)
            self.debts.append(house_debt)
            self.expenses.extend(house_expenses)
            self.transfers.extend(house_transfers)

    @staticmethod
    def find_object_by_name(objects, target_name):
        for obj in objects:
            if obj.name == target_name:
                return obj
        raise ValueError(
            f"can't find object with name {target_name}"
        )  # Raise if no match is found

    @staticmethod
    def find_object_by_type(objects, object_type):
        for obj in objects:
            if obj.type == object_type:
                return obj
        raise ValueError(
            f"can't find object with name {object_type}"
        )  # Raise if no match is found

    @staticmethod
    def parse_years(input_string):
        years = set()
        input_string = input_string.replace(" ", "")  # Remove any spaces
        parts = input_string.split(",")

        for part in parts:
            if "-" in part:
                try:
                    start, end = part.split("-")
                    start, end = int(start), int(end)
                    if start > end:
                        start, end = end, start
                    years.update(range(start, end + 1))
                except ValueError:
                    continue  # Skip invalid ranges
            else:
                try:
                    year = int(part)
                    years.add(year)
                except ValueError:
                    continue  # Skip invalid years

        return sorted(years)
