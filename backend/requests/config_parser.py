from model.config import Config
from requests.utilities import percentize
from model.tax_calculator import TaxBracket

def parse_tax_brackets(unparsed_brackets: list[dict]) -> list[tuple[float, float]]:
    tax_brackets = []
    lower_bound = 0
    for unparsed_tax_bracket in unparsed_brackets:
        tax_brackets.append(TaxBracket(percentize(unparsed_tax_bracket["rate"]), lower_bound, unparsed_tax_bracket["upper_bound"]))
        lower_bound = unparsed_tax_bracket["upper_bound"] + 1
    return tax_brackets

def parse_config(config: dict) -> Config:
    return Config(
        first_year=max(config["first_year"], 2024),
        last_year=min(config["last_year"], 2070),
        retirement_withdrawal_year=config["retirement_withdrawal_year"],
        unscheduled_debt_interest_rate=percentize(config["unscheduled_debt_interest_rate"]),
        maximum_bank_account_balance=config["maximum_bank_account_balance"],
        inflation_rate=percentize(config["inflation_rate"]),
        federal_standard_deduction=config["federal_standard_deduction"],
        federal_tax_brackets=parse_tax_brackets(config["federal_tax_brackets"]),
        state_standard_deduction=config["state_standard_deduction"],
        state_tax_brackets=parse_tax_brackets(config["state_tax_brackets"]),
        local_standard_deduction=config["local_standard_deduction"],
        local_tax_brackets=parse_tax_brackets(config["local_tax_brackets"]),
    )
