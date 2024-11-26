#!/bin/bash
set -eu # Exit on error or undefined variable

if [ "$FLASK_ENV" = "development" ]; then
    echo "Running in development mode with Flask..."
    exec flask run --debug --host=0.0.0.0
elif [ "$FLASK_ENV" = "production" ]; then
    echo "Running in production mode with Gunicorn..."
    exec gunicorn -b 0.0.0.0:8080 app:app
else
    echo "Invalid FLASK_ENV value: $FLASK_ENV"
    exit 1
fi
