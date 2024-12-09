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


from logger import get_logger

logger = get_logger()


class Simulations:
    def __init__(
        self,
        data: dict,
        first_year: int,
        last_year: int,
        mode: str,
    ):
        self.data = data
        self.first_year = first_year
        self.last_year = last_year
        self.dynamic = mode == Config.DYNAMIC

    def execute_simulation(
        self,
        years: List[int],
        investment_vehicles: List[InvestmentVehicle],
        accounts: List[Account],
        expenses: List[Expense],
        incomes: List[Income],
        transfers: List[Transfer],
        debts: List[Debt],
        assets: List[Asset],
        gifts: List[Gift],
        dynamic: bool = False,
    ) -> Aggregator:
        aggregator = Aggregator()
        aggregator.net_worth.append(sum(acct.balance() for acct in accounts) + sum(asset.value for asset in assets) - sum(d.amount for d in debts))
        aggregator.retirement.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.RETIREMENT))
        aggregator.roth_ira.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.ROTH_IRA))
        aggregator.investment.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.INVESTMENT))
        aggregator.five_two_nine.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.FIVE_TWO_NINE))
        aggregator.bank_account.append(sum(account.balance() for account in accounts if account.account_type.name == AccountType.BANK))
        aggregator.debt.append(-sum(d.amount for d in debts))
        aggregator.assets.append(sum(asset.value for asset in assets))

        for year in years:
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
                    dynamic=dynamic,
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

    def execute(self) -> Aggregator:
        aggregator = Aggregator()
        years = list(range(self.first_year, self.last_year))

        number_of_simulations = 1
        logger.info(f"Dynamic: {self.dynamic}")
        if self.dynamic:
            number_of_simulations = 1000

        for i in range(0, number_of_simulations):
            parsed = Handler(copy.deepcopy(self.data))
            results = self.execute_simulation(
                years,
                investment_vehicles=parsed.investment_vehicles,
                accounts=parsed.accounts,
                expenses=parsed.expenses,
                incomes=parsed.incomes,
                transfers=parsed.transfers,
                debts=parsed.debts,
                assets=parsed.assets,
                gifts=parsed.gifts,
                dynamic=self.dynamic,
            )
            aggregator.append(results)
        return aggregator
