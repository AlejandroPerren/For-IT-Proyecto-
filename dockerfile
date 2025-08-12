FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g nodemon ts-node typescript

EXPOSE 4000

WORKDIR /app/apps/server

CMD ["npm", "run", "dev"]
