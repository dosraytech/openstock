# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install build tools just in case
RUN apk add --no-cache libc-dev g++ make python3

COPY package*.json ./

RUN npm install

# Copy the rest of the application source code
COPY . .

# ---> ADD THIS LINE <---
# Explicitly run Nuxt's prepare command to generate types and auto-imports
RUN npx nuxi prepare

# Build the Nuxt application for production
RUN npm run build

# Stage 2: Create the final production image
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.output .

EXPOSE 3000

CMD ["node", "./server/index.mjs"]