from model.account_type import AccountType
from model.withdrawal_tax_type import WithdrawalTaxType


class Withdrawal:
    def __init__(
        self, amount: float, account_type: AccountType, capital_gains: float = 0.0
    ):
        self.amount = amount
        self.account_type = account_type
        self.capital_gains = capital_gains

    def tax_type(self):
        if self.account_type == AccountType.INVESTMENT:
            return WithdrawalTaxType.CAPITAL_GAINS
        elif self.account_type == AccountType.RETIREMENT:
            return WithdrawalTaxType.INCOME
        else:
            return WithdrawalTaxType.NONE
