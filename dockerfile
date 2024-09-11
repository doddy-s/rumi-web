#1st stage: building
FROM node:21-alpine AS build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

#2nd stage: serving
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]