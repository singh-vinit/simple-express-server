FROM node:20-alpine

WORKDIR /app

COPY package* .
RUN npm install

RUN npm install -g typescript

COPY ./prisma .
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]