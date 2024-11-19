#!/bin/sh
if [ "$NODE_ENV" = "development" ]; then
    echo "Running Development Server"
    exec npm start
else
    echo "Running Production Server"
    exec serve -s dist
fi
