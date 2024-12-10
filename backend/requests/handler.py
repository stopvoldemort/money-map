from model.account import Account
from model.account_type import AccountType
from model.debt import Debt
from model.asset import Asset
from model.expense import Expense
from model.income import Income
from model.annual_investment_allocation import AnnualInvestmentAllocation
from model.investment_proportion import InvestmentProportion
from model.investment_vehicle import InvestmentVehicle
from model.transfer import Transfer
from model.gift import Gift
from model.scheduled_debt import ScheduledDebt
from model.house_purchase import HousePurchase
from logger import get_logger
from requests.account_parser import account_parser
from requests.salary_parser import parse_salary_input
from requests.house_purchase_parser import parse_house_purchase
from requests.investment_vehicle_parser import parse_investment_vehicle
from requests.config_parser import parse_config
from requests.utilities import percentize

initial_form_data = {
    "investment_vehicles": [],
    "accounts": [],
    "expenses": [],
    "incomes": [],
    "transfers": [],
    "other_debts": [],
    "assets": [],
    "gifts": [],
    "scheduled_debts": [],
    "house_purchases": [],
}


class Handler:
    def __init__(self, form_data: dict):
        self.data = {**initial_form_data, **form_data}
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
                parse_investment_vehicle(investment_vehicle_input)
            )

        for account_input in self.data["accounts"]:
            self.accounts.append(account_parser(account_input))

        bank_account = self.get_account_by_type(AccountType.BANK)
        retirement_account = self.get_account_by_type(AccountType.RETIREMENT)
        roth_account = self.get_account_by_type(AccountType.ROTH_IRA)

        for debt_input in self.data["other_debts"]:
            aagr = debt_input.pop("aagr", 0)
            aagr = percentize(aagr)
            self.debts.append(Debt(**debt_input, aagr=aagr))

        for scheduled_debt_input in self.data["scheduled_debts"]:
            first_year_of_loan = 2025
            loan_term_years = scheduled_debt_input.pop("remaining_loan_term", None)
            aagr = scheduled_debt_input.pop("aagr", 0)
            aagr = percentize(aagr)
            debt = Debt(**scheduled_debt_input, aagr=aagr, scheduled=True)
            transfers = ScheduledDebt.generate_transfers(
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
            aagr = asset_input.pop("aagr", 0)
            aagr = percentize(aagr)
            tax_rate = asset_input.pop("tax_rate", 0)
            tax_rate = percentize(tax_rate)
            self.assets.append(Asset(**asset_input, aagr=aagr, tax_rate=tax_rate))

        for gift_input in self.data["gifts"]:
            account = self.find_object_by_name(
                self.accounts, gift_input.pop("account", None)
            )
            years = self.parse_years(gift_input.pop("years", []))
            for year in years:
                self.gifts.append(Gift(**gift_input, account=account, year=year))

        for expense_input in self.data["expenses"]:
            years = expense_input.pop("years", [])
            for year in years:
                self.expenses.append(Expense(**expense_input, year=year))

        for salary_input in self.data["salaries"]:
            incomes, transfers = parse_salary_input(salary_input, bank_account, retirement_account, roth_account)
            self.incomes.extend(incomes)
            self.transfers.extend(transfers)

        for other_income_input in self.data["other_incomes"]:
            years = other_income_input.pop("years", [])
            for year in years:
                self.incomes.append(
                    Income(**other_income_input, year=year, deposit_in=bank_account)
                )

        for transfer_input in self.data["transfers"]:
            transfer_from = self.get_account_by_type(transfer_input.pop("transfer_from", None))
            transfer_to = self.get_account_by_type(transfer_input.pop("transfer_to", None))
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

        for house_purchase_input in self.data["house_purchases"]:
            house_asset, house_debt, house_expenses, house_transfers = parse_house_purchase(house_purchase_input, bank_account)
            self.assets.append(house_asset)
            self.debts.append(house_debt)
            self.expenses.extend(house_expenses)
            self.transfers.extend(house_transfers)

        self.config = parse_config(self.data["config"])

    def get_account_by_type(self, account_type):
        for account in self.accounts:
            if account.account_type.name == account_type:
                return account
        get_logger().warning(f"can't find account with type {account_type}")

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
