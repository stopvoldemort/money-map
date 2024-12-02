from model.house_purchase import HousePurchase

def parse_asset_purchase(asset_purchase_input, bank_account):
    return HousePurchase(
        name=asset_purchase_input["name"],
        home_price=asset_purchase_input["price"],
        annual_interest_rate=percentize(asset_purchase_input["interest_rate"]),
        aagr=percentize(asset_purchase_input["aagr"]),
        first_year=asset_purchase_input["year_of_purchase"],
        loan_term_years=asset_purchase_input["loan_term_years"],
        down_payment_proportion=percentize(asset_purchase_input["down_payment_proportion"]),
        property_tax_rate=percentize(asset_purchase_input["property_tax_rate"]),
        annual_insurance_rate=percentize(asset_purchase_input["annual_insurance_rate"]),
        annual_upkeep_cost=asset_purchase_input["annual_upkeep_cost"],
        closing_costs_proportion=percentize(asset_purchase_input["closing_costs_proportion"]),
        from_account=bank_account,
    ).execute()

def percentize(value):
    return round(value / 100, 2)
