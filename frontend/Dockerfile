# frontend/Dockerfile

# Use the official Node.js image
FROM --platform=linux/amd64 node:16-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code
COPY . .

# Use a build argument to set the environment (default to development)
ARG ENV=development
ENV NODE_ENV=$ENV

# EXPOSE 3000

# Set a default port environment variable for the app to listen on
ENV PORT=8080

# Build the app and set up Nginx in production
RUN if [ "$ENV" = "production" ]; then \
      npm run build && \
      npm install -g serve; \
    fi

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]
