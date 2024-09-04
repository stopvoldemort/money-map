from typing import List
from model.account import Account
from model.account_type import AccountType
from model.debt import Debt
from model.expense import Expense
from model.withdrawal import Withdrawal


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
        accounts.sort(key=lambda a: AccountType.ALL.index(a.account_type))

        for payable in payables:
            for account in accounts:
                if year < account.earliest_withdrawal_year:
                    continue
                if (
                    account.account_type == AccountType.FIVE_TWO_NINE
                    and not payable.five_two_nine_eligible
                ):
                    continue
                while account.balance() > 0 and payable.amount > 0:
                    withdrawal_amount = min(account.balance(), payable.amount)

                    withdrawal = account.withdraw(withdrawal_amount)
                    withdrawals.append(withdrawal)
                    payable.pay(withdrawal.amount)

        return withdrawals
