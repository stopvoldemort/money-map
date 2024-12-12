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
