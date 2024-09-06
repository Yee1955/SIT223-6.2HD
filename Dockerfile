# Use a more recent Node.js LTS version
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application source code
COPY . .

# Set a health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
            CMD curl -f http://127.0.0.1:8000 || exit 1

# Inform Docker about the port we will run on
EXPOSE 8000

# The command to run our app when the container is run
CMD ["npm", "start"]
