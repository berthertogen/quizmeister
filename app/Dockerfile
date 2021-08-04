# syntax=docker/dockerfile:1
FROM node:alpine AS build
ARG project
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
RUN npm run build:$project

FROM trion/nginx-angular:latest
ARG project
COPY --from=build /app/dist/$project/ /usr/share/nginx/html/