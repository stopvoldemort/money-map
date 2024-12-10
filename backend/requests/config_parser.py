from model.config import Config

def parse_config(config: dict) -> Config:
    return Config(
        first_year=max(config["first_year"], 2024),
        last_year=min(config["last_year"], 2070)
    )
