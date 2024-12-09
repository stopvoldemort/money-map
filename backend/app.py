from flask import Flask, jsonify, request
from flask_cors import CORS
from model.simulations import Simulations
from logging import getLogger

logger = getLogger()

app = Flask(__name__)
CORS(app)


@app.route("/api/simulations/static", methods=["POST"])
def run_static_simulation():
    data = request.json
    simulation = Simulations(data, 2025, 2071, "static").execute()
    return jsonify(simulation.static_frontend())

@app.route("/api/simulations/dynamic", methods=["POST"])
def run_dynamic_simulation():
    data = request.json
    simulation = Simulations(data, 2025, 2071, 'Dynamic').execute()
    logger.info(simulation.dynamic_frontend())
    return jsonify(simulation.dynamic_frontend())



if __name__ == "__main__":
    app.run(host="0.0.0.0")
