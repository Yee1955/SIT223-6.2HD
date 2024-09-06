# Start from the Node.js base image
FROM node:7-onbuild

# Install curl needed for the health check and Docker installation
RUN apt-get update && apt-get install -y curl

# Set a health check for the container
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:8000 || exit 1

# Tell Docker which port to expose
EXPOSE 8000

# Switch to root to install Docker
USER root

# Download and install Docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh && \
    sh get-docker.sh

# After installation, remove the installation script
RUN rm -f get-docker.sh

# Switch back to the node user (or jenkins if you use jenkins user for node operations)
USER node
