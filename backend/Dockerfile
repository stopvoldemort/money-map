# backend/Dockerfile

# Use the official Python image
FROM --platform=linux/amd64 python:3.13

# Set the working directory
WORKDIR /app

# Copy requirements and install them
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask app code
COPY . .

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
