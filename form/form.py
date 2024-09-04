from IPython.display import display, clear_output
from ipywidgets import widgets
from results.results_displayer import ResultsDisplayer
from model.simulations import Simulations
from model.account_type import AccountType
from debt_input import DebtInput
from account_input import AccountInput
from income_input import IncomeInput
from expense_input import ExpenseInput
from gift_input import GiftInput
from transfer_input import TransferInput
from investment_vehicle_input import InvestmentVehicleInput
from helpers import Helpers


class Form:
    def __init__(self):
        self.investment_vehicle_inputs = (
            []
        )  # List to store instances of InvestmentVehicle
        self.debt_inputs = []  # List to store instances of DebtInput
        self.account_inputs = []  # List to store instances of AccountInput
        self.income_inputs = []  # List to store instances of IncomeInput
        self.expense_inputs = []  # List to store instances of ExpenseInput
        self.gift_inputs = []  # List to store instances of GiftInput
        self.transfer_inputs = []  # List to store instances of TransferInput
        self.display_area = widgets.Output()  # Output widget to manage in-place updates

        # Create the submit button once
        self.submit_btn = widgets.Button(description="Submit", button_style="info")
        self.submit_btn.on_click(self.handle_submit)

        self.results_displayer = ResultsDisplayer()

    #####  DEBTS  #####
    def add_debt_input(self, b=None):
        debt_input = DebtInput(self)
        self.debt_inputs.append(debt_input)
        self.update_display()

    def delete_debt_input(self, debt_input):
        if debt_input in self.debt_inputs:
            self.debt_inputs.remove(debt_input)
        self.update_display()

    #####  ACCOUNTS  #####
    def add_account_input(
        self,
        b=None,
        name="",
        account_type=AccountType.BANK,
        starting_balance=0.0,
        earliest_withdrawal_year=2024,
    ):
        account_input = AccountInput(
            self, name, account_type, starting_balance, earliest_withdrawal_year
        )
        self.account_inputs.append(account_input)
        self.update_display()

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
        all_data = self.get_all_data()
        return [account["name"] for account in all_data["accounts"]]

    #####  INCOMES  #####
    def add_income_input(
        self, b=None, name="", amount=0.0, deposit_in=None, years="", payroll_tax=True
    ):
        income_input = IncomeInput(
            self,
            name=name,
            amount=amount,
            deposit_in=deposit_in,
            years=years,
            payroll_tax=payroll_tax,
        )
        self.income_inputs.append(income_input)
        self.update_display()

    def delete_income_input(self, income_input):
        if income_input in self.income_inputs:
            self.income_inputs.remove(income_input)
        self.update_display()

    #####  EXPENSES  #####
    def add_expense_input(self, b=None):
        expense_input = ExpenseInput(self)
        self.expense_inputs.append(expense_input)
        self.update_display()

    def delete_expense_input(self, expense_input):
        if expense_input in self.expense_inputs:
            self.expense_inputs.remove(expense_input)
        self.update_display()

    #####  GIFTS  #####
    def add_gift_input(self, b=None):
        gift_input = GiftInput(self)
        self.gift_inputs.append(gift_input)
        self.update_display()

    def delete_gift_input(self, gift_input):
        if gift_input in self.gift_inputs:
            self.gift_inputs.remove(gift_input)
        self.update_display()

    #####  TRANSFERS  #####
    def add_transfer_input(self, b=None):
        transfer_input = TransferInput(self)
        self.transfer_inputs.append(transfer_input)
        self.update_display()

    def delete_transfer_input(self, transfer_input):
        if transfer_input in self.transfer_inputs:
            self.transfer_inputs.remove(transfer_input)
        self.update_display()

    #####  INVESTMENT VEHICLES  #####
    def add_investment_vehicle_input(
        self, b=None, name="", aagr=0.0, dynamic_mean=0.0, dynamic_std_dev=0.0
    ):
        investment_vehicle_input = InvestmentVehicleInput(
            self, name, aagr, dynamic_mean, dynamic_std_dev
        )
        self.investment_vehicle_inputs.append(investment_vehicle_input)
        self.update_display()

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

    #####  DISPLAY  #####
    def update_display(self):
        with self.display_area:
            clear_output(wait=True)

            investment_vehicle_widgets = [
                input.container for input in self.investment_vehicle_inputs
            ]
            account_widgets = [
                account_input.container for account_input in self.account_inputs
            ]
            debt_widgets = [debt_input.container for debt_input in self.debt_inputs]
            expense_widgets = [
                expense_input.container for expense_input in self.expense_inputs
            ]
            gift_widgets = [gift_input.container for gift_input in self.gift_inputs]
            transfer_widgets = [
                transfer_input.container for transfer_input in self.transfer_inputs
            ]

            add_investment_vehicle_btn = Helpers.add_input_button(
                "Add Investment Vehicle"
            )
            add_investment_vehicle_btn.on_click(self.add_investment_vehicle_input)

            add_account_btn = widgets.Button(description="Add Account")
            add_account_btn.on_click(self.add_account_input)

            add_debt_btn = widgets.Button(description="Add Debt")
            add_debt_btn.on_click(self.add_debt_input)

            add_income_btn = widgets.Button(description="Add Income")
            add_income_btn.on_click(self.add_income_input)

            add_expense_btn = widgets.Button(description="Add Expense")
            add_expense_btn.on_click(self.add_expense_input)

            add_gift_btn = widgets.Button(description="Add Gift")
            add_gift_btn.on_click(self.add_gift_input)

            add_transfer_btn = widgets.Button(description="Add Transfer")
            add_transfer_btn.on_click(self.add_transfer_input)

            display(
                widgets.VBox(
                    [
                        Helpers.inputsGroup(
                            "h2",
                            "Investment Vehicles",
                            investment_vehicle_widgets,
                            add_investment_vehicle_btn,
                        ),
                        Helpers.inputsGroup(
                            "h2", "Accounts", account_widgets, add_account_btn
                        ),
                        Helpers.inputsGroup("h2", "Debt", debt_widgets, add_debt_btn),
                        Helpers.inputs_group_v2(
                            "h2",
                            "Income",
                            IncomeInput.grid(self.income_inputs),
                            add_income_btn,
                            is_empty=(len(self.income_inputs) == 0),
                        ),
                        Helpers.inputsGroup(
                            "h2", "Expenses", expense_widgets, add_expense_btn
                        ),
                        Helpers.inputsGroup("h2", "Gifts", gift_widgets, add_gift_btn),
                        Helpers.inputsGroup(
                            "h2", "Transfers", transfer_widgets, add_transfer_btn
                        ),
                        self.submit_btn,
                    ]
                )
            )

    def display(self):
        self.add_investment_vehicle_input(
            self, name="s&p", aagr=0.0655, dynamic_mean=0.077, dynamic_std_dev=0.175
        )
        self.add_investment_vehicle_input(
            self, name="bonds", aagr=0.0352, dynamic_mean=0.039, dynamic_std_dev=0.0855
        )
        self.add_account_input(
            self, name="bank of america", account_type="bank", starting_balance=30000.0
        )
        self.add_account_input(
            self,
            name="fidelity",
            account_type="retirement",
            starting_balance=500000.0,
            earliest_withdrawal_year=2039,
        )
        self.add_income_input(
            self,
            name="spouse 1 income",
            amount="100000.0",
            deposit_in="bank of america",
            years="2024-2048",
        )
        self.add_income_input(
            self,
            name="spouse 2 income",
            amount="100000.0",
            deposit_in="bank of america",
            years="2024-2048",
        )
        self.add_income_input(
            self,
            name="spouse 1 social security",
            amount="35000.0",
            deposit_in="bank of america",
            years="2049-2070",
            payroll_tax=False,
        )
        self.add_income_input(
            self,
            name="spouse 2 social security",
            amount="35000.0",
            deposit_in="bank of america",
            years="2049-2070",
            payroll_tax=False,
        )
        display(self.display_area)
        self.update_display()

    def get_all_data(self):
        return {
            "debts": [debt_input.get_data() for debt_input in self.debt_inputs],
            "accounts": [
                account_input.get_data() for account_input in self.account_inputs
            ],
            "incomes": [income_input.get_data() for income_input in self.income_inputs],
            "expenses": [
                expense_input.get_data() for expense_input in self.expense_inputs
            ],
            "gifts": [gift_input.get_data() for gift_input in self.gift_inputs],
            "transfers": [
                transfer_input.get_data() for transfer_input in self.transfer_inputs
            ],
            "investment_vehicles": [
                investment_vehicle_input.get_data()
                for investment_vehicle_input in self.investment_vehicle_inputs
            ],
        }

    def handle_submit(self, b):
        data = self.get_all_data()
        first_year = 2024
        last_year = 2070
        dynamic = False
        debug = False
        results_data = Simulations(
            data,
            first_year=first_year,
            last_year=last_year,
            dynamic=dynamic,
            debug=dynamic,
        ).execute()
        self.results_displayer.display(
            first_year=first_year,
            last_year=last_year,
            aggregator=results_data,
            dynamic=dynamic,
            debug=debug,
        )
