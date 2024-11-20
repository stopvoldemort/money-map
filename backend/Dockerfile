# backend/Dockerfile

# Use the official Python image
FROM --platform=linux/amd64 python:3.13

# Set the working directory
WORKDIR /app

# Copy requirements and install them
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Use a build argument to set the environment (default to development)
ARG ENV=development
ENV FLASK_ENV=$ENV

# Install Gunicorn for production
RUN if [ "$ENV" = "production" ]; then \
      pip install gunicorn; \
    fi

# Copy the Flask app code
COPY . .

# Set environment variables
ENV FLASK_APP=app.py

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
