import random
import math


class InvestmentVehicle:
    def __init__(
        self,
        name: str,
        aagr: float,
        dynamic_mean: float = 0.0,
        dynamic_std_dev: float = 0.0,
    ):
        self.name = name
        self.aagr = aagr
        self.dynamic_mean = dynamic_mean
        self.dynamic_std_dev = dynamic_std_dev

    def conditionally_reset_aagr(self, dynamic: bool):
        if dynamic and not math.isclose(self.dynamic_mean, 0):
            self.aagr = self.dynamic_mean + self.dynamic_std_dev * random.normalvariate(
                0, 1
            )
