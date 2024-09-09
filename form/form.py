from IPython.display import display, clear_output
from ipywidgets import widgets

from form.debt_input import DebtInput
from form.asset_input import AssetInput
from form.account_input import AccountInput
from form.income_input import IncomeInput
from form.expense_input import ExpenseInput
from form.gift_input import GiftInput
from form.transfer_input import TransferInput
from form.house_purchase_input import HousePurchaseInput
from form.investment_vehicle_input import InvestmentVehicleInput
from form.helpers import Helpers


class Form:
    def __init__(self, preload_data: dict = {}):
        self.preload_data = preload_data
        self.investment_vehicle_inputs = (
            []
        )  # List to store instances of InvestmentVehicle
        self.debt_inputs = []  # List to store instances of DebtInput
        self.asset_inputs = []  # List to store instances of AssetInput
        self.account_inputs = []  # List to store instances of AccountInput
        self.income_inputs = []  # List to store instances of IncomeInput
        self.expense_inputs = []  # List to store instances of ExpenseInput
        self.gift_inputs = []  # List to store instances of GiftInput
        self.transfer_inputs = []  # List to store instances of TransferInput
        self.house_purchase_inputs = []  # List to store instances of HousePurchaseInput

        self.display_area = widgets.Output()

        self.submit_btn = widgets.Button(
            description="Print params", button_style="info"
        )
        self.submit_btn.on_click(self.handle_submit)

    #####  DEBTS  #####
    def add_debt_input(self, data: dict = {}):
        debt_input = DebtInput(self, **data)
        self.debt_inputs.append(debt_input)
        self.update_display()

    def handle_add_debt_input_click(self, b=None):
        self.add_debt_input()

    def delete_debt_input(self, debt_input):
        if debt_input in self.debt_inputs:
            self.debt_inputs.remove(debt_input)

    #####  ASSETS  #####
    def add_asset_input(self, data: dict = {}):
        asset_input = AssetInput(self, **data)
        self.asset_inputs.append(asset_input)
        self.update_display()

    def handle_add_asset_input_click(self, b=None):
        self.add_asset_input()

    def delete_asset_input(self, asset_input):
        if asset_input in self.asset_inputs:
            self.asset_inputs.remove(asset_input)
        self.update_display()

    #####  ACCOUNTS  #####
    def add_account_input(self, data: dict = {}):
        account_input = AccountInput(self, **data)
        self.account_inputs.append(account_input)
        self.update_display()

    def handle_add_account_input_click(self, b=None):
        self.add_account_input()

    def delete_account_input(self, account_input):
        if account_input in self.account_inputs:
            self.account_inputs.remove(account_input)
            self.update_account_dropdowns()
        self.update_display()

    def update_account_dropdowns(self):
        for gift_input in self.gift_inputs:
            gift_input.update_account_dropdown()
        for transfer_input in self.transfer_inputs:
            transfer_input.update_account_dropdown()
        for income_input in self.income_inputs:
            income_input.update_account_dropdown()

    def get_account_options(self):
        return [account.get_data()["name"] for account in self.account_inputs]

    #####  INCOMES  #####
    def add_income_input(self, data={}):
        income_input = IncomeInput(self, **data)
        self.income_inputs.append(income_input)
        self.update_display()

    def handle_add_income_input_click(self, b=None):
        self.add_income_input()

    def delete_income_input(self, income_input):
        if income_input in self.income_inputs:
            self.income_inputs.remove(income_input)
        self.update_display()

    #####  EXPENSES  #####
    def add_expense_input(self, data: dict = {}):
        expense_input = ExpenseInput(self, **data)
        self.expense_inputs.append(expense_input)
        self.update_display()

    def handle_add_expense_input_click(self, b=None):
        self.add_expense_input()

    def delete_expense_input(self, expense_input):
        if expense_input in self.expense_inputs:
            self.expense_inputs.remove(expense_input)
        self.update_display()

    #####  GIFTS  #####
    def add_gift_input(self, data: dict = {}):
        gift_input = GiftInput(self, **data)
        self.gift_inputs.append(gift_input)
        self.update_display()

    def handle_add_gift_input_click(self, b=None):
        self.add_gift_input()

    def delete_gift_input(self, gift_input):
        if gift_input in self.gift_inputs:
            self.gift_inputs.remove(gift_input)
        self.update_display()

    #####  TRANSFERS  #####
    def add_transfer_input(self, data: dict = {}):
        transfer_input = TransferInput(self, **data)
        self.transfer_inputs.append(transfer_input)
        self.update_display()

    def handle_add_transfer_input_click(self, b=None):
        self.add_transfer_input()

    def delete_transfer_input(self, transfer_input):
        if transfer_input in self.transfer_inputs:
            self.transfer_inputs.remove(transfer_input)
        self.update_display()

    #####  INVESTMENT VEHICLES  #####
    def add_investment_vehicle_input(self, data: dict = {}):
        input = InvestmentVehicleInput(self, **data)
        self.investment_vehicle_inputs.append(input)
        self.update_display()

    def handle_add_investment_vehicle_input_click(self, b=None):
        self.add_investment_vehicle_input()

    def delete_investment_vehicle_input(self, investment_vehicle_input):
        if investment_vehicle_input in self.investment_vehicle_inputs:
            self.investment_vehicle_inputs.remove(investment_vehicle_input)
        self.update_display()
        self.update_investment_vehicle_dropdowns()

    def get_investment_vehicle_options(self):
        return [input.get_data()["name"] for input in self.investment_vehicle_inputs]

    def update_investment_vehicle_dropdowns(self):
        # Loop through each account and update the dropdowns
        for account_input in self.account_inputs:
            for (
                investment_distribution_input
            ) in account_input.investment_distribution_inputs:
                for (
                    investment_proportion_input
                ) in investment_distribution_input.investment_proportion_inputs:
                    investment_proportion_input.investment_widget.options = (
                        self.get_investment_vehicle_options()
                    )

    #####  HOUSE PURCHASE  #####
    def add_house_purchase_input(self, data: dict = {}):
        house_purchase_input = HousePurchaseInput(self, **data)
        self.house_purchase_inputs.append(house_purchase_input)
        self.update_display()

    def handle_add_house_purchase_input_click(self, b=None):
        self.add_house_purchase_input()

    def delete_house_purchase_input(self, house_purchase_input):
        if house_purchase_input in self.house_purchase_inputs:
            self.house_purchase_inputs.remove(house_purchase_input)
        self.update_display()

    #####  PRINT  #####
    def update_display(self):
        with self.display_area:
            clear_output(wait=True)

            account_widgets = [
                account_input.container for account_input in self.account_inputs
            ]

            add_investment_vehicle_btn = Helpers.add_input_button(
                "Add Investment Vehicle"
            )
            add_investment_vehicle_btn.on_click(
                self.handle_add_investment_vehicle_input_click
            )

            add_account_btn = Helpers.add_input_button("Add Account")
            add_account_btn.on_click(self.handle_add_account_input_click)

            add_debt_btn = Helpers.add_input_button("Add Debt")
            add_debt_btn.on_click(self.handle_add_debt_input_click)

            add_asset_btn = Helpers.add_input_button("Add Asset")
            add_asset_btn.on_click(self.handle_add_asset_input_click)

            add_income_btn = Helpers.add_input_button("Add Income")
            add_income_btn.on_click(self.handle_add_income_input_click)

            add_expense_btn = Helpers.add_input_button("Add Expense")
            add_expense_btn.on_click(self.handle_add_expense_input_click)

            add_gift_btn = Helpers.add_input_button("Add Gift")
            add_gift_btn.on_click(self.handle_add_gift_input_click)

            add_transfer_btn = Helpers.add_input_button("Add Transfer")
            add_transfer_btn.on_click(self.handle_add_transfer_input_click)

            add_house_purchase_btn = Helpers.add_input_button("Add House Purchase")
            add_house_purchase_btn.on_click(self.handle_add_house_purchase_input_click)

            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group_v2(
                            "h2",
                            "Investment Vehicles",
                            Helpers.simple_grid(
                                self.investment_vehicle_inputs,
                                InvestmentVehicleInput.column_labels,
                            ),
                            add_investment_vehicle_btn,
                            is_empty=(len(self.investment_vehicle_inputs) == 0),
                        ),
                        Helpers.inputsGroup(
                            "h2", "Accounts", account_widgets, add_account_btn
                        ),
                        Helpers.inputs_group_v2(
                            "h2",
                            "Debt",
                            Helpers.simple_grid(
                                self.debt_inputs,
                                DebtInput.column_labels,
                            ),
                            add_debt_btn,
                            is_empty=(len(self.debt_inputs) == 0),
                        ),
                        Helpers.inputs_group_v2(
                            "h2",
                            "Asset",
                            Helpers.simple_grid(
                                self.asset_inputs,
                                AssetInput.column_labels,
                            ),
                            add_asset_btn,
                            is_empty=(len(self.asset_inputs) == 0),
                        ),
                        Helpers.inputs_group_v2(
                            "h2",
                            "Income",
                            Helpers.simple_grid(
                                self.income_inputs,
                                IncomeInput.column_labels,
                            ),
                            add_income_btn,
                            is_empty=(len(self.income_inputs) == 0),
                        ),
                        Helpers.inputs_group_v2(
                            "h2",
                            "Expenses",
                            Helpers.simple_grid(
                                self.expense_inputs,
                                ExpenseInput.column_labels,
                            ),
                            add_expense_btn,
                            is_empty=(len(self.expense_inputs) == 0),
                        ),
                        Helpers.inputs_group_v2(
                            "h2",
                            "Gifts",
                            Helpers.simple_grid(
                                self.gift_inputs,
                                GiftInput.column_labels,
                            ),
                            add_gift_btn,
                            is_empty=(len(self.gift_inputs) == 0),
                        ),
                        Helpers.inputs_group_v2(
                            "h2",
                            "Transfers",
                            Helpers.simple_grid(
                                self.transfer_inputs,
                                TransferInput.column_labels,
                            ),
                            add_transfer_btn,
                            is_empty=(len(self.transfer_inputs) == 0),
                        ),
                        Helpers.inputs_group_v2(
                            "h2",
                            "House Purchases",
                            Helpers.simple_grid(
                                self.house_purchase_inputs,
                                HousePurchaseInput.column_labels,
                            ),
                            add_house_purchase_btn,
                            is_empty=(len(self.house_purchase_inputs) == 0),
                        ),
                        self.submit_btn,
                    ]
                )
            )

    def initialize(self):
        for vehicle in self.preload_data["investment_vehicles"]:
            self.add_investment_vehicle_input(vehicle)

        for acct in self.preload_data["accounts"]:
            self.add_account_input(acct)

        for income in self.preload_data["incomes"]:
            self.add_income_input(income)

        for debt in self.preload_data["debts"]:
            self.add_debt_input(debt)

        for asset in self.preload_data["assets"]:
            self.add_asset_input(asset)

        for exp in self.preload_data["expenses"]:
            self.add_expense_input(exp)

        for gift in self.preload_data["gifts"]:
            self.add_gift_input(gift)

        for transfer in self.preload_data["transfers"]:
            self.add_transfer_input(transfer)

        for house_purchase in self.preload_data["house_purchases"]:
            self.add_house_purchase_input(house_purchase)

    def display(self):
        self.initialize()

        display(self.display_area)
        self.update_display()

    @staticmethod
    def get_all_inputs_data(inputs):
        return [input.get_data() for input in inputs]

    def get_all_data(self):
        return {
            "debts": self.get_all_inputs_data(self.debt_inputs),
            "assets": self.get_all_inputs_data(self.asset_inputs),
            "accounts": self.get_all_inputs_data(self.account_inputs),
            "incomes": self.get_all_inputs_data(self.income_inputs),
            "expenses": self.get_all_inputs_data(self.expense_inputs),
            "gifts": self.get_all_inputs_data(self.gift_inputs),
            "transfers": self.get_all_inputs_data(self.transfer_inputs),
            "investment_vehicles": self.get_all_inputs_data(
                self.investment_vehicle_inputs
            ),
            "house_purchases": self.get_all_inputs_data(self.house_purchase_inputs),
        }

    def handle_submit(self, b: widgets.Button = None):
        data = self.get_all_data()
        print(data)
