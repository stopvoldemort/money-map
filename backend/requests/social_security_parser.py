from model.income import Income

def parse_social_security_input(social_security_input, bank_account, last_year):
    from_year = social_security_input.pop("from_year", None)
    if from_year is None:
        raise ValueError("from_year is required")

    incomes = []
    amount = social_security_input.pop("amount", 0.0)
    name = social_security_input.pop("name", "")

    for year in range(from_year, last_year + 1):
        incomes.append(Income(name=name, amount=amount, year=year, deposit_in=bank_account, payroll_tax=False))

    return incomes
