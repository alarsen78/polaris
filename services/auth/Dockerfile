FROM node:20

WORKDIR /app

COPY . .

RUN npm install --include=dev

WORKDIR /app/services/auth

CMD ["node", "--loader", "ts-node/esm", "--experimental-specifier-resolution=node", "auth-service.ts"]