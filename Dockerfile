# build stage
FROM node:10-alpine as build-stage

WORKDIR /app

COPY package*.json ./

COPY . /app

RUN npm install --only=prod

RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
