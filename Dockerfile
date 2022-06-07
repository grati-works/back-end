FROM node:alpine

WORKDIR /usr/backend

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE 3333

CMD npx prisma generate && npx prisma migrate dev && npm run build && npm run start:preview:prod
