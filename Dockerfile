FROM node:alpine

WORKDIR /usr/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma generate
RUN npx prisma migrate
RUN npm run build

CMD ["npm", "start"]
