FROM node:17-slim
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
EXPOSE 3000
RUN  npm run build
CMD ["npm", "start"]
