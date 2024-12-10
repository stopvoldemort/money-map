from typing import List, Tuple
import copy
from model.year_simulator import YearSimulator
from model.account import Account
from model.aggregator import Aggregator
from model.asset import Asset
from model.debt import Debt
from model.expense import Expense
from model.gift import Gift
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
        gifts: List[Gift],
    ) -> Aggregator:
        aggregator = Aggregator(self.config.first_year)
        aggregator.net_worth.append(sum(acct.balance() for acct in accounts) + sum(asset.value for asset in assets) - sum(d.amount for d in debts))
        aggregator.retirement.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.RETIREMENT))
        aggregator.roth_ira.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.ROTH_IRA))
        aggregator.investment.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.INVESTMENT))
        aggregator.five_two_nine.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.FIVE_TWO_NINE))
        aggregator.bank_account.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.BANK))
        aggregator.debt.append(-sum(d.amount for d in debts))
        aggregator.assets.append(sum(asset.value for asset in assets))

        for year in range(self.config.first_year, self.config.last_year):
            accounts, expenses, incomes, transfers, debts, assets, gifts = (
                YearSimulator.execute(
                    year=year,
                    investment_vehicles=investment_vehicles,
                    accounts=accounts,
                    expenses=expenses,
                    incomes=incomes,
                    transfers=transfers,
                    debts=debts,
                    assets=assets,
                    gifts=gifts,
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
        return aggregator
