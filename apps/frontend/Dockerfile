# Base image
FROM node:18 AS builder
# Create app directory
WORKDIR /app/frontend
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]