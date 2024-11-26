from model.account import Account
from model.annual_investment_allocation import AnnualInvestmentAllocation
from model.investment_proportion import InvestmentProportion

def account_parser(account_input):
  investments_input = account_input.pop("investments", [])
  annual_investment_allocations = parse_investments(investments_input)
  return Account(**account_input, annual_investment_allocations=annual_investment_allocations)


# Example of #parse_investments
## account_input
# [
#   {"name": "stocks", "color": "steelblue", "anchors": [{"year": 2024, "value": 70}, {"year": 2026, "value": 60}]},
#   {"name": "bonds", "color": "lightgreen", "anchors": [{"year": 2024, "value": 30}, {"year": 2026, "value": 40}]}
# ]

## returns
# [
#   AnnualInvestmentAllocation(
#     year=2024,
#     investment_proportions=[
#       InvestmentProportion(investment_vehicle_name="stocks", proportion=0.7),
#       InvestmentProportion(investment_vehicle_name="bonds", proportion=0.3)
#     ]
#   ),
#   AnnualInvestmentAllocation(
#     year=2025,
#     investment_proportions=[
#       InvestmentProportion(investment_vehicle_name="stocks", proportion=0.65),
#       InvestmentProportion(investment_vehicle_name="bonds", proportion=0.35)
#     ]
#   ),
#   AnnualInvestmentAllocation(
#     year=2026,
#     investment_proportions=[
#       InvestmentProportion(investment_vehicle_name="stocks", proportion=0.6),
#       InvestmentProportion(investment_vehicle_name="bonds", proportion=0.4)
#     ]
#   )
# ]
def parse_investments(investments_input):
    if len(investments_input) == 0:
        return []

    # Get all unique years from anchors
    years = set()
    for inv in investments_input:
        years.update(anchor["year"] for anchor in inv["anchors"])
    years = sorted(years)

    # Create allocations for each year (including interpolated years)
    allocations = []
    for year in range(min(years), max(years) + 1):
        proportions = []

        for inv in investments_input:
            # Find surrounding anchor points
            anchors = sorted(inv["anchors"], key=lambda x: x["year"])

            # Find the proportion through linear interpolation
            for i in range(len(anchors) - 1):
                if anchors[i]["year"] <= year <= anchors[i + 1]["year"]:
                    year1, val1 = anchors[i]["year"], anchors[i]["value"]
                    year2, val2 = anchors[i + 1]["year"], anchors[i + 1]["value"]

                    # Linear interpolation formula
                    proportion = val1 + (val2 - val1) * (year - year1) / (year2 - year1)
                    proportions.append(
                        InvestmentProportion(
                            investment_vehicle_name=inv["name"],
                            proportion=round(proportion / 100, 2)  # Convert percentage to decimal and round
                        )
                    )
                    break

        allocations.append(
            AnnualInvestmentAllocation(
                year=year,
                investment_proportions=proportions
            )
        )

    return allocations
