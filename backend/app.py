from flask import Flask, jsonify, request
from model.simulations import Simulations

app = Flask(__name__)


@app.route("/api/simulations/run", methods=["POST"])
def run_simulation():
    data = request.json
    simulation = Simulations(data, 2024, 2070, "static").execute()
    return jsonify(simulation.for_frontend())


if __name__ == "__main__":
    app.run(host="0.0.0.0")
