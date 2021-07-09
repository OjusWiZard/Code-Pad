FROM node:14.17.3-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . ./

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /var/www/app

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
