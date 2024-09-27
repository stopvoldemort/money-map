from model.withdrawal_tax_type import WithdrawalTaxType


class AccountType:
    BANK = "bank"
    RETIREMENT = "retirement"
    INVESTMENT = "investments"
    FIVE_TWO_NINE = "529"
    ROTH_IRA = "roth_ira"
    # Note: The order of this is the order in which they should be withdrawn from to pay for things
    ALL = [FIVE_TWO_NINE, BANK, INVESTMENT, RETIREMENT, ROTH_IRA]

    """
                |   Contribution's Tax Deductibility            Miscellanous
                |   Federal         State           Local       Withdrawal Tax Treatment    529 Eligible
    -----------------------------------------------------------------------------------------------------                
    Bank        |   No              No              No          None                        No
    Retirement  |   Yes             Yes             Yes         Income                      No
    Investment  |   No              No              No          Capital Gains               No
    529         |   No              Yes             Yes         None                        Yes
    Roth IRA    |   No              No              No          None                        No
    """

    def __init__(self, name: str):
        self.name = name
        self.federal_income_tax_deductible = False
        self.state_income_tax_deductible = False
        self.local_income_tax_deductible = False
        self.withdrawal_tax_treatment = WithdrawalTaxType.NONE
        self.five_two_nine = False

        if self.name == AccountType.RETIREMENT:
            self.federal_income_tax_deductible = True
            self.state_income_tax_deductible = True
            self.local_income_tax_deductible = True
            self.withdrawal_tax_treatment = WithdrawalTaxType.INCOME

        if self.name == AccountType.INVESTMENT:
            self.withdrawal_tax_treatment = WithdrawalTaxType.CAPITAL_GAINS

        if self.name == AccountType.FIVE_TWO_NINE:
            self.state_income_tax_deductible = True
            self.local_income_tax_deductible = True
            self.five_two_nine = True
