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
from model.gift import Gift
from model.payer import Payer
from model.withdrawal import Withdrawal
from model.withdrawal_tax_type import WithdrawalTaxType
from model.account_type import AccountType


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
        gifts: List[Gift],
        debug: bool = False,
        dynamic: bool = False,
    ) -> Tuple[
        List[Account],
        List[Expense],
        List[Income],
        List[Transfer],
        List[Debt],
        List[Asset],
        List[Gift],
    ]:
        # SETUP
        withdrawals = []
        starting_tax_liability = 0.0
        extra_taxes = 0.0
        tax_calculator = TaxCalculator()
        for iv in investment_vehicles:
            iv.conditionally_reset_aagr(dynamic)

        annual_incomes = [income for income in incomes if income.year == year]
        annual_gifts = [gift for gift in gifts if gift.year == year]
        annual_transfers = [transfer for transfer in transfers if transfer.year == year]

        if debug:
            print(f"*** START OF {year} ***")
            for a in accounts:
                print(f"[{year}] [account] {a.name}: {a.balance()}")
            for d in debts:
                print(f"[{year}] [debt] {d.name}: {d.amount} ({d.scheduled})")
            for t in annual_transfers:
                print(f"[{year}] [transfer] {t.name}: {t.amount}")
            for g in annual_gifts:
                print(f"[{year}] [gift] {g.name}: {g.amount}")
            for i in annual_incomes:
                print(f"[{year}] [income] {i.name}: {i.amount}")
            for e in expenses:
                if e.year == year:
                    print(f"[{year}] [expense] {e.name}: {e.amount}")

        # DEPOSIT INCOME
        for income in annual_incomes:
            income.deposit_in.deposit(income.amount)

        # GIFTS
        for gift in annual_gifts:
            gift.receive()

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

        # TODO: This will overestimate the retirement contribution when there aren't sufficient funds in the transfer_from account
        retirement_transfer = sum(
            transfer.amount
            for transfer in annual_transfers
            if isinstance(transfer.transfer_to, Account)
            and transfer.transfer_to.account_type == AccountType.RETIREMENT
        )

        federal_tax_eligible_income = -(min(retirement_transfer, 45000))
        for income in annual_incomes:
            if income.federal_income_tax:
                federal_tax_eligible_income += income.amount
        federal_income_taxes = tax_calculator.calculate_federal_income_tax(
            federal_tax_eligible_income
        )

        five_two_nine_transfer = sum(
            transfer.amount
            for transfer in annual_transfers
            if isinstance(transfer.transfer_to, Account)
            and transfer.transfer_to.account_type == AccountType.FIVE_TWO_NINE
        )

        ny_tax_eligible_income = -(
            min(retirement_transfer, 45000) + min(five_two_nine_transfer, 10000)
        )
        for income in annual_incomes:
            if income.ny_income_tax:
                ny_tax_eligible_income += income.amount
        ny_income_taxes = tax_calculator.calculate_ny_income_tax(ny_tax_eligible_income)

        nyc_tax_eligible_income = -(
            min(retirement_transfer, 45000) + min(five_two_nine_transfer, 10000)
        )
        for income in annual_incomes:
            if income.nyc_income_tax:
                nyc_tax_eligible_income += income.amount
        nyc_income_taxes = tax_calculator.calculate_nyc_income_tax(
            nyc_tax_eligible_income
        )

        expenses.append(
            Expense(
                f"taxes for {year}",
                payroll_taxes
                + federal_income_taxes
                + ny_income_taxes
                + nyc_income_taxes,
                year,
            )
        )
        annual_expenses = [e for e in expenses if e.year == year]

        #####   PAY EXPENSES  ######

        w = Payer.attempt_to_pay_payables(year, annual_expenses, accounts)
        withdrawals.extend(w)

        unpaid_expenses = sum(expense.amount for expense in annual_expenses)
        # TODO: The aagr of unpaid expenses should live somewhere rather than be hardcoded here
        debts.append(Debt(f"unpaid expenses for {year}", unpaid_expenses, 0.10))

        #####   PAY UNSCHEDULED DEBT  ######
        unscheduled_debts = [
            debt for debt in debts if debt.amount > 0 and not debt.scheduled
        ]
        w = Payer.attempt_to_pay_payables(year, unscheduled_debts, accounts)
        withdrawals.extend(w)

        if debug:
            for w in withdrawals:
                print(
                    f"[{year}] [withdrawal] {w.amount}, {w.account_type}, (capital gains {w.capital_gains})"
                )

        #####   NEXT YEAR'S TAXES  ######
        extra_taxes = 0.0
        extra_income = 0.0
        capital_gains = 0.0
        for withdrawal in withdrawals:
            if withdrawal.tax_type() == WithdrawalTaxType.INCOME:
                extra_income += withdrawal.amount
            elif withdrawal.tax_type() == WithdrawalTaxType.CAPITAL_GAINS:
                capital_gains += withdrawal.capital_gains

        extra_taxes += (
            tax_calculator.calculate_federal_income_tax(
                federal_tax_eligible_income + extra_income
            )
            - federal_income_taxes
        )
        extra_taxes += (
            tax_calculator.calculate_ny_income_tax(
                ny_tax_eligible_income + extra_income
            )
            - ny_income_taxes
        )
        extra_taxes += (
            tax_calculator.calculate_nyc_income_tax(
                nyc_tax_eligible_income + extra_income
            )
            - nyc_income_taxes
        )
        extra_taxes += capital_gains * tax_calculator.capital_gains_tax_rate()

        expenses.append(Expense(f"extra taxes for {year}", extra_taxes, year + 1))

        if debug:
            print(f"*** END OF {year} ***")
            for a in accounts:
                print(f"[{year}] [account] {a.name}: {a.balance()}")
            for d in debts:
                print(f"[{year}] [debt] {d.name}: {d.amount} ({d.scheduled})")
            for t in annual_transfers:
                print(f"[{year}] [transfer] {t.name}: {t.amount}")
            for g in annual_gifts:
                print(f"[{year}] [gift] {g.name}: {g.amount}")
            for i in annual_incomes:
                print(f"[{year}] [income] {i.name}: {i.amount}")
            for e in expenses:
                if e.year == year:
                    print(f"[{year}] [expense] {e.name}: {e.amount}")

        # APPLY ANNUAL GROWTH
        for account in accounts:
            account.apply_annual_growth(year)

        for debt in debts:
            debt.apply_annual_growth()

        for asset in assets:
            asset.apply_annual_growth()

        return accounts, expenses, incomes, transfers, debts, assets, gifts
