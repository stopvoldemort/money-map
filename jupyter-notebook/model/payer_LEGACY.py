from typing import List
from model.account_LEGACY import Account
from model.account_type_LEGACY import AccountType
from model.debt_LEGACY import Debt
from model.expense_LEGACY import Expense
from model.withdrawal_LEGACY import Withdrawal


class Payer:
    ## Returns an array of withdrawals and a dollar amount for any outstanding debt
    @classmethod
    def attempt_to_pay_payables(
        cls, year: int, payables: List[Expense | Debt], accounts: List[Account]
    ) -> List[Withdrawal]:
        withdrawals = []

        # sort payables with five_two_nine_eligible payables first
        payables.sort(key=lambda p: p.five_two_nine_eligible, reverse=True)
        # sort accounts according to the order of their account type in AccountType.ALL
        accounts.sort(key=lambda a: AccountType.ALL.index(a.account_type.name))

        for payable in payables:
            for account in accounts:
                if year < account.earliest_withdrawal_year:
                    continue
                if (
                    account.account_type.five_two_nine
                    and not payable.five_two_nine_eligible
                ):
                    continue
                while account.balance() > 0 and payable.amount > 0:
                    withdrawal_amount = min(account.balance(), payable.amount)

                    withdrawal = account.withdraw(withdrawal_amount)
                    withdrawals.append(withdrawal)
                    payable.pay(withdrawal.amount)

        return withdrawals
