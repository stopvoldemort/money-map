from typing import List, Tuple
import copy
from model.year_simulator import YearSimulator
from model.account import Account
from model.aggregator import Aggregator
from model.asset import Asset
from model.debt import Debt
from model.expense import Expense
from model.income import Income
from model.investment_vehicle import InvestmentVehicle
from model.transfer import Transfer
from model.account_type import AccountType
from requests.handler import Handler
from model.config import Config


class Simulations:
    def __init__(
        self,
        config: Config,
    ):
        self.config = config

    def execute(
        self,
        investment_vehicles: List[InvestmentVehicle],
        accounts: List[Account],
        expenses: List[Expense],
        incomes: List[Income],
        transfers: List[Transfer],
        debts: List[Debt],
        assets: List[Asset],
    ) -> Aggregator:
        aggregator = Aggregator(self.config.first_year)

        for year in range(self.config.first_year, self.config.last_year):
            accounts, expenses, incomes, transfers, debts, assets = (
                YearSimulator.execute(
                    year=year,
                    investment_vehicles=investment_vehicles,
                    accounts=accounts,
                    expenses=expenses,
                    incomes=incomes,
                    transfers=transfers,
                    debts=debts,
                    assets=assets,
                    config=self.config,
                )
            )
            aggregator.net_worth.append(sum(acct.balance() for acct in accounts) + sum(asset.value for asset in assets) - sum(d.amount for d in debts))
            aggregator.retirement.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.RETIREMENT))
            aggregator.roth_ira.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.ROTH_IRA))
            aggregator.investment.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.INVESTMENT))
            aggregator.five_two_nine.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.FIVE_TWO_NINE))
            aggregator.bank_account.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.BANK))
            aggregator.debt.append(-sum(d.amount for d in debts))
            aggregator.assets.append(sum(asset.value for asset in assets))

            debt_interest = []
            for debt in debts:
                if debt.annual_growth > 1:
                    debt_interest.append({
                        "name": debt.name,
                        "value": debt.annual_growth * -1
                    })
            debt_interest.sort(key=lambda x: x["value"])
            aggregator.debt_interest.append(debt_interest)

            expenses_for_frontend = []
            for expense in expenses:
                if expense.year == year and not expense.tax_payment and expense.starting_amount > 1:
                    expenses_for_frontend.append({
                        "name": expense.name,
                        "value": expense.starting_amount * -1
                    })
            expenses_for_frontend.sort(key=lambda x: x["value"])
            aggregator.expenses.append(expenses_for_frontend)

            taxes_for_frontend = []
            for expense in expenses:
                if expense.year == year and expense.tax_payment and expense.starting_amount > 1:
                    taxes_for_frontend.append({
                        "name": expense.name,
                        "value": expense.starting_amount * -1
                    })
            taxes_for_frontend.sort(key=lambda x: x["value"])
            aggregator.taxes.append(taxes_for_frontend)

            incomes_for_frontend = []
            for income in incomes:
                if income.year == year and income.amount > 1:
                    incomes_for_frontend.append({
                        "name": income.name,
                        "value": income.amount
                    })
            incomes_for_frontend.sort(key=lambda x: x["value"], reverse=True)
            aggregator.incomes.append(incomes_for_frontend)

            capital_gains_for_frontend = []
            for account in accounts:
                if account.annual_growth > 1:
                    capital_gains_for_frontend.append({
                        "name": account.name,
                        "value": account.annual_growth
                    })

            for asset in assets:
                if asset.annual_growth > 1:
                    capital_gains_for_frontend.append({
                        "name": asset.name,
                        "value": asset.annual_growth
                    })
            capital_gains_for_frontend.sort(key=lambda x: x["value"], reverse=True)
            aggregator.capital_gains.append(capital_gains_for_frontend)

        return aggregator
