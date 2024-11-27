from model.income import Income
from model.transfer import Transfer

def parse_salary_input(salary_input, bank_account, retirement_account, roth_account):
    from_year = salary_input.pop("from_year", None)
    to_year = salary_input.pop("to_year", None)
    if from_year is None or to_year is None:
        raise ValueError("from_year and to_year are required")

    incomes = []
    transfers = []
    amount = salary_input.pop("amount", 0.0)
    retirement_contribution = salary_input.pop("retirement_contribution", 0.0)
    roth_contribution = salary_input.pop("roth_contribution", 0.0)
    employer_retirement_contribution = salary_input.pop("employer_retirement_contribution", 0.0)
    name = salary_input.pop("name", "")

    for year in range(from_year, to_year + 1):
        incomes.append(Income(name=name, amount=amount, year=year, deposit_in=bank_account))
        incomes.append(Income(name=f"{name} employer contribution", amount=employer_retirement_contribution, year=year, deposit_in=retirement_account))
        transfers.append(Transfer(name=f"{name} retirement contribution", amount=retirement_contribution, year=year, transfer_from=bank_account, transfer_to=retirement_account))
        transfers.append(Transfer(name=f"{name} roth contribution", amount=roth_contribution, year=year, transfer_from=bank_account, transfer_to=roth_account))

    return incomes, transfers
