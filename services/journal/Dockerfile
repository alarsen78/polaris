FROM node:20

WORKDIR /app

# Copy the entire monorepo into the container
COPY . .

RUN npm install --include=dev

WORKDIR /app/services/journal

CMD ["node", "--loader", "ts-node/esm", "--experimental-specifier-resolution=node", "journal-service.ts"]