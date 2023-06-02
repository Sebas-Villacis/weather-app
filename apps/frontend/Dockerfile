###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# Base image
FROM node:18-alpine AS development
# Create app directory
WORKDIR /app/frontend
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./
# Install app dependencies
RUN npm ci

COPY --chown=node:node . .


EXPOSE 3000
CMD [ "npm", "run", "dev" ]

