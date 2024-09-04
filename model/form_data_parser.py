from model.account import Account
from model.debt import Debt
from model.expense import Expense
from model.income import Income
from model.investment_distribution import InvestmentDistribution
from model.investment_proportion import InvestmentProportion
from model.investment_vehicle import InvestmentVehicle
from model.transfer import Transfer
from model.gift import Gift


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

        for debt_input in self.data["debts"]:
            self.debts.append(Debt(**debt_input))

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
                        investment_proportions=investment_proportions,
                    )
                )

            self.accounts.append(
                Account(
                    **account_input, investment_distributions=investment_distributions
                )
            )

        for gift_input in self.data["gifts"]:
            account = self.find_object_by_name(
                self.accounts, gift_input.pop("account", None)
            )
            years = gift_input.pop("years", [])
            for year in years:
                self.gifts.append(Gift(**gift_input, account=account, year=year))

        for expense_input in self.data["expenses"]:
            years = expense_input.pop("years", [])
            for year in years:
                self.expenses.append(Expense(**expense_input, year=year))

        for income_input in self.data["incomes"]:
            deposit_in = self.find_object_by_name(
                self.accounts, income_input.pop("deposit_in", None)
            )
            years = income_input.pop("years", [])
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
            years = transfer_input.pop("years", [])
            for year in years:
                self.transfers.append(
                    Transfer(
                        **transfer_input,
                        year=year,
                        transfer_from=transfer_from,
                        transfer_to=transfer_to,
                    )
                )

    def find_object_by_name(self, objects, target_name):
        for obj in objects:
            if obj.name == target_name:
                return obj
        raise ValueError(
            f"can't find object with name {target_name}"
        )  # Raise if no match is found
