FROM node:19-alpine AS builder
WORKDIR /app
COPY ./src ./
RUN npm install
EXPOSE 8080