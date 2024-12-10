from flask import Flask, jsonify, request
from flask_cors import CORS
from model.simulations import Simulations
from requests.handler import Handler

app = Flask(__name__)
CORS(app)


@app.route("/api/simulations/run", methods=["POST"])
def run_simulation():
    json_data = request.json
    parsed = Handler(json_data)
    simulation = Simulations(parsed.config).execute(parsed.investment_vehicles, parsed.accounts, parsed.expenses, parsed.incomes, parsed.transfers, parsed.debts, parsed.assets, parsed.gifts)
    return jsonify(simulation.for_frontend())


if __name__ == "__main__":
    app.run(host="0.0.0.0")
