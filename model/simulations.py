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
from model.form_data_parser import FormDataParser


class Simulations:
    def __init__(
        self,
        data: dict,
        first_year: int,
        last_year: int,
        dynamic: bool = False,
        debug: bool = False,
    ):
        self.data = data
        self.first_year = first_year
        self.last_year = last_year
        self.dynamic = dynamic
        self.debug = debug

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
        debug: bool = False,
        dynamic: bool = True,
    ) -> Aggregator:
        aggregator = Aggregator()
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
                    debug=debug,
                    dynamic=dynamic,
                )
            )
            aggregator.net_worth.append(
                sum(acct.balance() for acct in accounts)
                + sum(asset.value for asset in assets)
                - sum(d.amount for d in debts)
            )
            aggregator.assets.append(sum(asset.value for asset in assets))
            aggregator.five_two_nine.append(
                sum(
                    account.balance()
                    for account in accounts
                    if account.account_type == AccountType.FIVE_TWO_NINE
                )
            )
            aggregator.bank_account.append(
                sum(
                    account.balance()
                    for account in accounts
                    if account.account_type == AccountType.BANK
                )
            )
            aggregator.investment.append(
                sum(
                    account.balance()
                    for account in accounts
                    if account.account_type == AccountType.INVESTMENT
                )
            )
            aggregator.retirement.append(
                sum(
                    account.balance()
                    for account in accounts
                    if account.account_type == AccountType.RETIREMENT
                )
            )
            aggregator.debt.append(sum(d.amount for d in debts))
        return aggregator

    def execute(self) -> Aggregator:
        aggregator = Aggregator()
        years = list(range(self.first_year, self.last_year))

        number_of_simulations = 1
        if self.dynamic:
            number_of_simulations = 1000

        for i in range(0, number_of_simulations):
            parsed = FormDataParser(copy.deepcopy(self.data))
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
                debug=self.debug,
                dynamic=self.dynamic,
            )
            aggregator.append(results)
        return aggregator
