# Stage 1: Build the application
# Use a specific Node.js version based on your project's requirements.
# The '-alpine' tag provides a lightweight Linux distribution.
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock files
# This leverages Docker's layer caching. The 'npm install' step
# will only be re-run if these files change.
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Nuxt application for production
RUN npm run build

# Stage 2: Create the final production image
# Use the same lightweight Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy the built output from the 'builder' stage
# Nuxt 3 builds the application into the '.output' directory
COPY --from=builder /app/.output .

# Expose the port the app will run on
# The default Nuxt 3 port is 3000
EXPOSE 3000

# The command to start the Nuxt server
# This runs the production-optimized Nitro server
CMD ["node", "./server/index.mjs"]