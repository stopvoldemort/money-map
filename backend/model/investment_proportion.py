from model.investment_vehicle import InvestmentVehicle


class InvestmentProportion:
    def __init__(self, investment_vehicle: InvestmentVehicle, proportion: float):
        self.investment_vehicle = investment_vehicle
        self.proportion = proportion
