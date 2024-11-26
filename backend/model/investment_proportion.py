from model.investment_vehicle import InvestmentVehicle


class InvestmentProportion:
    def __init__(self, investment_vehicle_name: str, proportion: float):
        self.investment_vehicle_name = investment_vehicle_name
        self.proportion = proportion

    def __repr__(self):
        return f"InvestmentProportion(investment_vehicle_name={self.investment_vehicle_name}, proportion={self.proportion})"
