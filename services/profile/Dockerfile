FROM node:20

WORKDIR /app

# Copy the entire monorepo into the container
COPY . .

RUN npm install --include=dev

WORKDIR /app/services/profile

CMD ["node", "--loader", "ts-node/esm", "--experimental-specifier-resolution=node", "profile-service.ts"]