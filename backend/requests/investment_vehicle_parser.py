from requests.utilities import percentize
from model.investment_vehicle import InvestmentVehicle

def parse_investment_vehicle(investment_vehicle_input):
    return InvestmentVehicle(
        name=investment_vehicle_input["name"],
        aagr=percentize(investment_vehicle_input["aagr"]),
    )