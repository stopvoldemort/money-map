from flask import Flask, jsonify, request
from flask_cors import CORS
from model.simulations import Simulations
from requests.handler import Handler

from logger import get_logger

app = Flask(__name__)
CORS(app)


@app.route("/api/simulations/run", methods=["POST"])
def run_simulation():
    scenarios_data = request.json
    scenarios_results = []

    for scenario_data in scenarios_data:
        scenario_results = {}
        scenario_results["id"] = scenario_data["id"]
        scenario_values = scenario_data["values"]
        scenario_results["name"] = scenario_values["name"]
        parsed = Handler(scenario_values)
        simulation = Simulations(parsed.config).execute(parsed.investment_vehicles, parsed.accounts, parsed.expenses, parsed.debt_payments, parsed.incomes, parsed.transfers, parsed.debts, parsed.assets)
        scenario_results["year_results"] = simulation.for_frontend()
        scenarios_results.append(scenario_results)

    return jsonify(scenarios_results)


if __name__ == "__main__":
    app.run(host="0.0.0.0")
