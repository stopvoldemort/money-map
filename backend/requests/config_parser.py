from model.config import Config
from requests.utilities import percentize

def parse_config(config: dict) -> Config:
    return Config(
        first_year=max(config["first_year"], 2024),
        last_year=min(config["last_year"], 2070),
        retirement_withdrawal_year=config["retirement_withdrawal_year"],
        unscheduled_debt_interest_rate=percentize(config["unscheduled_debt_interest_rate"]),
        maximum_bank_account_balance=config["maximum_bank_account_balance"],
        inflation_rate=percentize(config["inflation_rate"]),
    )
