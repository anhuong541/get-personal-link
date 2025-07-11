# Use Node.js 20 Alpine as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first for better caching
COPY backend/package.json backend/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY backend/ .

# Build the application
RUN yarn build

# Expose port 3456 (to avoid conflict with frontend)
EXPOSE 3456

# Start the application
CMD ["yarn", "start:prod"] 