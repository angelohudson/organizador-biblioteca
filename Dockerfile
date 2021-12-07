# Select container base
FROM node:16
# Move to app directory
WORKDIR /user/src/app
# Cope dependencies
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy all app files
COPY ./ ./
# Select port 8080 to expose the app
EXPOSE 8080