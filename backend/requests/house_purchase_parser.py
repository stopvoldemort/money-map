from model.house_purchase import HousePurchase
from requests.utilities import percentize

def parse_house_purchase(house_purchase_input, bank_account, inflation_rate):
    return HousePurchase(
        name=house_purchase_input["name"],
        home_price=house_purchase_input["price"],
        annual_interest_rate=percentize(house_purchase_input["interest_rate"]),
        aagr=percentize(house_purchase_input["aagr"]),
        first_year=house_purchase_input["year_of_purchase"],
        loan_term_years=house_purchase_input["loan_term_years"],
        down_payment_proportion=percentize(house_purchase_input["down_payment_proportion"]),
        property_tax_rate=percentize(house_purchase_input["property_tax_rate"]),
        annual_insurance_rate=percentize(house_purchase_input["annual_insurance_rate"]),
        annual_upkeep_cost=house_purchase_input["annual_upkeep_cost"],
        closing_costs_proportion=percentize(house_purchase_input["closing_costs_proportion"]),
        inflation_rate=inflation_rate,
        from_account=bank_account,
    ).execute()
