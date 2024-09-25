from IPython.display import display, clear_output
from ipywidgets import widgets

from form.debt_input import DebtInput
from form.scheduled_debt_input import ScheduledDebtInput
from form.asset_input import AssetInput
from form.account_input import AccountInput
from form.income_input import IncomeInput
from form.expense_input import ExpenseInput
from form.gift_input import GiftInput
from form.transfer_input import TransferInput
from form.house_purchase_input import HousePurchaseInput
from form.investment_vehicle_input import InvestmentVehicleInput
from form.helpers import Helpers
from examples.empty_form import empty_form


class Form:
    def __init__(self, basic=False):
        self.basic = basic

    #####  DEBTS  #####
    def add_debt_input(self, data: dict = {}, update_display=True):
        debt_input = DebtInput(self, **data)
        self.debt_inputs.append(debt_input)
        if update_display:
            self.update_debt_display()

    def handle_add_debt_input_click(self, b=None):
        self.add_debt_input()

    def delete_debt_input(self, debt_input):
        if debt_input in self.debt_inputs:
            self.debt_inputs.remove(debt_input)

    #####  SCHDULED DEBTS  #####
    def add_scheduled_debt_input(self, data: dict = {}, update_display=True):
        scheduled_debt_input = ScheduledDebtInput(self, **data)
        self.scheduled_debt_inputs.append(scheduled_debt_input)
        if update_display:
            self.update_scheduled_debt_display()

    def handle_add_scheduled_debt_input_click(self, b=None):
        self.add_scheduled_debt_input()

    def delete_scheduled_debt_input(self, scheduled_debt_input):
        if scheduled_debt_input in self.scheduled_debt_inputs:
            self.scheduled_debt_inputs.remove(scheduled_debt_input)
        self.update_scheduled_debt_display()

    #####  ASSETS  #####
    def add_asset_input(self, data: dict = {}, update_display=True):
        asset_input = AssetInput(self, **data)
        self.asset_inputs.append(asset_input)
        if update_display:
            self.update_asset_display()

    def handle_add_asset_input_click(self, b=None):
        self.add_asset_input()

    def delete_asset_input(self, asset_input):
        if asset_input in self.asset_inputs:
            self.asset_inputs.remove(asset_input)
        self.update_asset_display()

    #####  ACCOUNTS  #####
    def add_account_input(self, data: dict = {}, update_display=True):
        account_input = AccountInput(self, **data)
        self.account_inputs.append(account_input)
        if update_display:
            self.update_account_display()

    def handle_add_account_input_click(self, b=None):
        self.add_account_input()

    def delete_account_input(self, account_input):
        if account_input in self.account_inputs:
            self.account_inputs.remove(account_input)
            self.update_account_dropdowns()
        self.update_account_display()

    def update_account_dropdowns(self):
        account_options = self.get_account_options()

        for gift_input in self.gift_inputs:
            gift_input.update_account_dropdown(account_options)
        self.update_gift_display()

        for transfer_input in self.transfer_inputs:
            transfer_input.update_account_dropdown(account_options)
        self.update_transfer_display()

        for income_input in self.income_inputs:
            income_input.update_account_dropdown(account_options)
        self.update_income_display()

        for house_purchase_input in self.house_purchase_inputs:
            house_purchase_input.update_account_dropdown(account_options)
        self.update_house_purchase_display()

        for scheduled_debt_input in self.scheduled_debt_inputs:
            scheduled_debt_input.update_account_dropdown(account_options)
        self.update_scheduled_debt_display()

    def get_account_options(self):
        return [account.get_data()["name"] for account in self.account_inputs]

    #####  INCOMES  #####
    def add_income_input(self, data={}, update_display=True):
        income_input = IncomeInput(self, **data)
        self.income_inputs.append(income_input)
        if update_display:
            self.update_income_display()

    def handle_add_income_input_click(self, b=None):
        self.add_income_input()

    def delete_income_input(self, income_input):
        if income_input in self.income_inputs:
            self.income_inputs.remove(income_input)
        self.update_income_display()

    #####  EXPENSES  #####
    def add_expense_input(self, data: dict = {}, update_display=True):
        expense_input = ExpenseInput(self, **data)
        self.expense_inputs.append(expense_input)
        if update_display:
            self.update_expense_display()

    def handle_add_expense_input_click(self, b=None):
        self.add_expense_input()

    def delete_expense_input(self, expense_input):
        if expense_input in self.expense_inputs:
            self.expense_inputs.remove(expense_input)
        self.update_expense_display()

    #####  GIFTS  #####
    def add_gift_input(self, data: dict = {}, update_display=True):
        gift_input = GiftInput(self, **data)
        self.gift_inputs.append(gift_input)
        if update_display:
            self.update_gift_display()

    def handle_add_gift_input_click(self, b=None):
        self.add_gift_input()

    def delete_gift_input(self, gift_input):
        if gift_input in self.gift_inputs:
            self.gift_inputs.remove(gift_input)
        self.update_gift_display()

    #####  TRANSFERS  #####
    def add_transfer_input(self, data: dict = {}, update_display=True):
        transfer_input = TransferInput(self, **data)
        self.transfer_inputs.append(transfer_input)
        if update_display:
            self.update_transfer_display()

    def handle_add_transfer_input_click(self, b=None):
        self.add_transfer_input()

    def delete_transfer_input(self, transfer_input):
        if transfer_input in self.transfer_inputs:
            self.transfer_inputs.remove(transfer_input)
        self.update_transfer_display()

    #####  INVESTMENT VEHICLES  #####
    def add_investment_vehicle_input(self, data: dict = {}, update_display=True):
        input = InvestmentVehicleInput(self, **data)
        self.investment_vehicle_inputs.append(input)
        if update_display:
            self.update_investment_vehicle_display()

    def handle_add_investment_vehicle_input_click(self, b=None):
        self.add_investment_vehicle_input()

    def delete_investment_vehicle_input(self, investment_vehicle_input):
        if investment_vehicle_input in self.investment_vehicle_inputs:
            self.investment_vehicle_inputs.remove(investment_vehicle_input)
        self.update_investment_vehicle_dropdowns()
        self.update_investment_vehicle_display()

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
                    investment_proportion_input.update_investment_vehicle_dropdown(
                        self.get_investment_vehicle_options()
                    )

    #####  HOUSE PURCHASE  #####
    def add_house_purchase_input(self, data: dict = {}, update_display=True):
        house_purchase_input = HousePurchaseInput(self, **data)
        self.house_purchase_inputs.append(house_purchase_input)
        if update_display:
            self.update_house_purchase_display()

    def handle_add_house_purchase_input_click(self, b=None):
        self.add_house_purchase_input()

    def delete_house_purchase_input(self, house_purchase_input):
        if house_purchase_input in self.house_purchase_inputs:
            self.house_purchase_inputs.remove(house_purchase_input)
        self.update_house_purchase_display()

    #####  DISPLAY  #####
    def update_investment_vehicle_display(self):
        with self.investment_vehicle_display_area:
            clear_output(wait=True)
            add_investment_vehicle_btn = widgets.Button(
                description="Add investment type",
                disabled=self.basic,
            )
            add_investment_vehicle_btn.on_click(
                self.handle_add_investment_vehicle_input_click
            )
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "Investment Types",
                            Helpers.simple_grid(
                                self.investment_vehicle_inputs,
                                InvestmentVehicleInput.column_labels,
                            ),
                            add_investment_vehicle_btn,
                            is_empty=(len(self.investment_vehicle_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_investment_vehicles(self):
        display(self.investment_vehicle_display_area)
        self.update_investment_vehicle_display()

    def update_account_display(self):
        with self.account_display_area:
            clear_output(wait=True)
            add_account_btn = widgets.Button(
                description="Add account", disabled=self.basic
            )
            add_account_btn.on_click(self.handle_add_account_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.account_inputs_group(
                            "Accounts (e.g., bank, retirement)",
                            self.account_inputs,
                            add_account_btn,
                            is_empty=len(self.account_inputs) == 0,
                        ),
                    ]
                )
            )

    def display_accounts(self):
        display(self.account_display_area)
        self.update_account_display()

    def update_income_display(self):
        with self.income_display_area:
            clear_output(wait=True)
            add_income_btn = widgets.Button(description="Add income")
            add_income_btn.on_click(self.handle_add_income_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "Income (e.g., salary, social security)",
                            Helpers.simple_grid(
                                self.income_inputs,
                                IncomeInput.column_labels,
                            ),
                            add_income_btn,
                            is_empty=(len(self.income_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_incomes(self):
        display(self.income_display_area)
        self.update_income_display()

    def update_asset_display(self):
        with self.assset_display_area:
            clear_output(wait=True)
            add_asset_btn = widgets.Button(description="Add asset")
            add_asset_btn.on_click(self.handle_add_asset_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "Assets (e.g., property, gold)",
                            Helpers.simple_grid(
                                self.asset_inputs,
                                AssetInput.column_labels,
                            ),
                            add_asset_btn,
                            is_empty=(len(self.asset_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_assets(self):
        display(self.assset_display_area)
        self.update_asset_display()

    def update_scheduled_debt_display(self):
        with self.scheduled_debt_display_area:
            clear_output(wait=True)
            add_scheduled_debt_btn = widgets.Button(description="Add debt")
            add_scheduled_debt_btn.on_click(self.handle_add_scheduled_debt_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "Debts with scheduled payments (e.g., mortgage, car loans)",
                            Helpers.simple_grid(
                                self.scheduled_debt_inputs,
                                ScheduledDebtInput.column_labels,
                            ),
                            add_scheduled_debt_btn,
                            is_empty=(len(self.scheduled_debt_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_scheduled_debts(self):
        display(self.scheduled_debt_display_area)
        self.update_scheduled_debt_display()

    def update_debt_display(self):
        with self.debt_display_area:
            clear_output(wait=True)
            add_debt_btn = widgets.Button(description="Add debt")
            add_debt_btn.on_click(self.handle_add_debt_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "Other Debts (e.g. credit card)",
                            Helpers.simple_grid(
                                self.debt_inputs,
                                DebtInput.column_labels,
                            ),
                            add_debt_btn,
                            is_empty=(len(self.debt_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_debts(self):
        display(self.debt_display_area)
        self.update_debt_display()

    def update_expense_display(self):
        with self.expense_display_area:
            clear_output(wait=True)
            add_expense_btn = widgets.Button(description="Add expense")
            add_expense_btn.on_click(self.handle_add_expense_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "Expenses",
                            Helpers.simple_grid(
                                self.expense_inputs,
                                ExpenseInput.column_labels,
                            ),
                            add_expense_btn,
                            is_empty=(len(self.expense_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_expenses(self):
        display(self.expense_display_area)
        self.update_expense_display()

    def update_gift_display(self):
        with self.gift_display_area:
            clear_output(wait=True)
            add_gift_btn = widgets.Button(description="Add gift")
            add_gift_btn.on_click(self.handle_add_gift_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "Gifts",
                            Helpers.simple_grid(
                                self.gift_inputs,
                                GiftInput.column_labels,
                            ),
                            add_gift_btn,
                            is_empty=(len(self.gift_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_gifts(self):
        display(self.gift_display_area)
        self.update_gift_display()

    def update_transfer_display(self):
        with self.transfer_display_area:
            clear_output(wait=True)
            add_transfer_btn = widgets.Button(description="Add transfer")
            add_transfer_btn.on_click(self.handle_add_transfer_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "Transfers (e.g., retirement contributions)",
                            Helpers.simple_grid(
                                self.transfer_inputs,
                                TransferInput.column_labels,
                            ),
                            add_transfer_btn,
                            is_empty=(len(self.transfer_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_transfers(self):
        display(self.transfer_display_area)
        self.update_transfer_display()

    def update_house_purchase_display(self):
        with self.house_purchase_display_area:
            clear_output(wait=True)
            add_house_purchase_btn = widgets.Button(description="Add House Purchase")
            add_house_purchase_btn.on_click(self.handle_add_house_purchase_input_click)
            display(
                widgets.VBox(
                    [
                        Helpers.inputs_group(
                            "House Purchases",
                            Helpers.simple_grid(
                                self.house_purchase_inputs,
                                HousePurchaseInput.column_labels,
                            ),
                            add_house_purchase_btn,
                            is_empty=(len(self.house_purchase_inputs) == 0),
                        ),
                    ]
                )
            )

    def display_house_purchases(self):
        display(self.house_purchase_display_area)
        self.update_house_purchase_display()

    def display_print_button(self):
        print_btn = widgets.Button(description="Print params", button_style="info")
        print_btn.on_click(self.handle_submit)
        display(print_btn)

    def initialize(self, preload_data: dict = empty_form):
        self.preload_data = preload_data

        self.investment_vehicle_inputs = []
        self.debt_inputs = []
        self.scheduled_debt_inputs = []
        self.asset_inputs = []
        self.account_inputs = []
        self.income_inputs = []
        self.expense_inputs = []
        self.gift_inputs = []
        self.transfer_inputs = []
        self.house_purchase_inputs = []

        self.account_display_area = widgets.Output()
        self.investment_vehicle_display_area = widgets.Output()
        self.income_display_area = widgets.Output()
        self.assset_display_area = widgets.Output()
        self.scheduled_debt_display_area = widgets.Output()
        self.debt_display_area = widgets.Output()
        self.expense_display_area = widgets.Output()
        self.gift_display_area = widgets.Output()
        self.transfer_display_area = widgets.Output()
        self.house_purchase_display_area = widgets.Output()

        for vehicle in self.preload_data["investment_vehicles"]:
            self.add_investment_vehicle_input(vehicle, update_display=False)

        for acct in self.preload_data["accounts"]:
            self.add_account_input(acct, update_display=False)

        for income in self.preload_data["incomes"]:
            self.add_income_input(income, update_display=False)

        for scheduled_debt in self.preload_data["scheduled_debts"]:
            self.add_scheduled_debt_input(scheduled_debt, update_display=False)

        for debt in self.preload_data["debts"]:
            self.add_debt_input(debt, update_display=False)

        for asset in self.preload_data["assets"]:
            self.add_asset_input(asset, update_display=False)

        for exp in self.preload_data["expenses"]:
            self.add_expense_input(exp, update_display=False)

        for gift in self.preload_data["gifts"]:
            self.add_gift_input(gift, update_display=False)

        for transfer in self.preload_data["transfers"]:
            self.add_transfer_input(transfer, update_display=False)

        for house_purchase in self.preload_data["house_purchases"]:
            self.add_house_purchase_input(house_purchase, update_display=False)

    @staticmethod
    def get_all_inputs_data(inputs):
        return [input.get_data() for input in inputs]

    def get_all_data(self):
        return {
            "debts": self.get_all_inputs_data(self.debt_inputs),
            "scheduled_debts": self.get_all_inputs_data(self.scheduled_debt_inputs),
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
