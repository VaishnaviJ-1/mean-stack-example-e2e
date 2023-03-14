FROM node:17-slim AS build

WORKDIR /app
COPY package.json package-lock.json npm-shrinkwrap.json ./

RUN npm install 
COPY . .

RUN npm run build --prod

#configure nginx web server
FROM nginx:alpine
COPY --from=build /app/dist/client /usr/share/nginx/html
