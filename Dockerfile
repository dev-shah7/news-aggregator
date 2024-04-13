FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

RUN npm run build
EXPOSE 5176

CMD ["npm", "run", "dev"]