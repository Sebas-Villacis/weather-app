# Base image
FROM node:18 AS builder
# Create app directory
WORKDIR /app/backend
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
# Install app dependencies
RUN npm install && npm cache clean --force

# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate

COPY . .



RUN npm run build

#The second FROM is the second stage in the multi-stage build and is used to run the application.
FROM node:18
#Copy from your builder image only files and folders required to run the Nest app.
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package*.json ./
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma

EXPOSE 3333
CMD [ "npm", "run", "start:migrate:prod" ]