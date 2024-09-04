class AccountType:
    BANK = "bank"
    RETIREMENT = "retirement"
    INVESTMENT = "investments"
    FIVE_TWO_NINE = "529"
    # Note: The order of this is the order in which they should be withdrawn from to pay for things
    ALL = [FIVE_TWO_NINE, BANK, INVESTMENT, RETIREMENT]
