FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run-script build

EXPOSE 4002

CMD ["npm", "run", "stg"]