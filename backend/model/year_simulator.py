from typing import Tuple, List
from operator import ge
from model.tax_calculator import TaxCalculator
from model.investment_vehicle import InvestmentVehicle
from model.account import Account
from model.expense import Expense
from model.income import Income
from model.transfer import Transfer
from model.debt import Debt
from model.asset import Asset
from model.payer import Payer
from model.withdrawal_tax_type import WithdrawalTaxType
from model.config import Config

class YearSimulator:
    @classmethod
    def execute(
        cls,
        year: int,
        investment_vehicles: List[InvestmentVehicle],
        accounts: List[Account],
        expenses: List[Expense],
        incomes: List[Income],
        transfers: List[Transfer],
        debts: List[Debt],
        assets: List[Asset],
        config: Config,
    ) -> Tuple[
        List[Account],
        List[Expense],
        List[Income],
        List[Transfer],
        List[Debt],
        List[Asset],
    ]:
        # SETUP
        withdrawals = []
        extra_taxes = 0.0
        tax_calculator = TaxCalculator()

        annual_incomes = [income for income in incomes if income.year == year]
        annual_transfers = [transfer for transfer in transfers if transfer.year == year]

        # DEPOSIT INCOME
        for income in annual_incomes:
            income.deposit_in.deposit(income.amount)

        # TRANSFERS
        for transfer in annual_transfers:
            withdrawal, expense = transfer.execute()
            withdrawals.append(withdrawal)
            if expense is not None:
                expenses.append(expense)

        # CALCULATE TAXES
        payroll_taxes = 0.0
        for income in annual_incomes:
            if income.payroll_tax:
                payroll_taxes += tax_calculator.calculate_payroll_tax(income.amount)

        # federal
        federal_tax_eligible_income = sum(
            income.amount for income in annual_incomes if income.federal_income_tax
        )
        federal_tax_eligible_income -= sum(
            transfer.transfered_amount
            for transfer in annual_transfers
            if isinstance(transfer.transfer_to, Account)
            and transfer.transfer_to.account_type.federal_income_tax_deductible
        )
        federal_income_taxes = tax_calculator.calculate_federal_income_tax(
            federal_tax_eligible_income
        )

        # state
        state_tax_eligible_income = sum(
            income.amount for income in annual_incomes if income.state_income_tax
        )
        state_tax_eligible_income -= sum(
            transfer.transfered_amount
            for transfer in annual_transfers
            if isinstance(transfer.transfer_to, Account)
            and transfer.transfer_to.account_type.state_income_tax_deductible
        )
        state_income_taxes = tax_calculator.calculate_state_income_tax(state_tax_eligible_income)

        # local
        local_tax_eligible_income = sum(
            income.amount for income in annual_incomes if income.local_income_tax
        )
        local_tax_eligible_income -= sum(
            transfer.transfered_amount
            for transfer in annual_transfers
            if isinstance(transfer.transfer_to, Account)
            and transfer.transfer_to.account_type.local_income_tax_deductible
        )
        local_income_taxes = tax_calculator.calculate_local_income_tax(
            local_tax_eligible_income
        )

        asset_taxes = 0.0
        for asset in assets:
            asset_taxes += asset.annual_tax_bill()

        expenses.append(
            Expense(
                f"taxes for {year}",
                payroll_taxes
                + federal_income_taxes
                + state_income_taxes
                + local_income_taxes
                + asset_taxes,
                year,
                tax_payment=True,
            )
        )
        annual_expenses = [e for e in expenses if e.year == year]

        #####   PAY EXPENSES  ######

        w = Payer.attempt_to_pay_payables(year, annual_expenses, accounts)
        withdrawals.extend(w)

        unpaid_expenses = sum(expense.amount for expense in annual_expenses)
        if unpaid_expenses > 1.0:
            debts.append(Debt(f"unpaid expenses for {year}", unpaid_expenses, config.unscheduled_debt_interest_rate))

        #####   PAY UNSCHEDULED DEBT  ######
        unscheduled_debts = [
            debt for debt in debts if debt.amount > 0 and not debt.scheduled
        ]
        w = Payer.attempt_to_pay_payables(year, unscheduled_debts, accounts)
        withdrawals.extend(w)

        #####   REBALANCE EXCESS  ######
        for account in accounts:
            withdrawal = account.rebalance(year)
            if withdrawal is not None:
                withdrawals.append(withdrawal)

        #####   NEXT YEAR'S TAXES  ######
        extra_income_taxes = 0.0
        extra_income = 0.0
        capital_gains = 0.0
        for withdrawal in withdrawals:
            if withdrawal.tax_type == WithdrawalTaxType.INCOME:
                extra_income += withdrawal.amount
            elif withdrawal.tax_type == WithdrawalTaxType.CAPITAL_GAINS:
                capital_gains += withdrawal.capital_gains

        extra_income_taxes += (
            tax_calculator.calculate_federal_income_tax(
                federal_tax_eligible_income + extra_income
            )
            - federal_income_taxes
        )
        extra_income_taxes += (
            tax_calculator.calculate_state_income_tax(
                state_tax_eligible_income + extra_income
            )
            - state_income_taxes
        )
        extra_income_taxes += (
            tax_calculator.calculate_local_income_tax(
                local_tax_eligible_income + extra_income
            )
            - local_income_taxes
        )

        if capital_gains > 0:
            capital_gains_tax = capital_gains * tax_calculator.capital_gains_tax_rate()
            expenses.append(
                Expense(
                    f"capital gains tax for {year}",
                    capital_gains_tax,
                    year + 1,
                    tax_payment=True,
                )
            )

        if extra_income_taxes > 0:
            expenses.append(
                Expense(
                    f"extra income taxes for {year}",
                    extra_taxes,
                    year + 1,
                    tax_payment=True,
                )
            )

        # APPLY ANNUAL GROWTH
        for account in accounts:
            account.apply_annual_growth(year, investment_vehicles)

        for debt in debts:
            debt.apply_annual_growth()

        for asset in assets:
            asset.apply_annual_growth()

        return accounts, expenses, incomes, transfers, debts, assets
