class Asset:
    def __init__(self, name: str, value: float, aagr: float):
        self.name = name
        self.value = value
        self.aagr = aagr

    def apply_annual_growth(self):
        self.value += self.value * self.aagr
