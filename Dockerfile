FROM node:21-slim

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install pnpm
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm

# Install app dependencies
COPY package.json /app/
RUN pnpm install -s

# Set environment variables
ENV NODE_ENV production

# Bundle app source
COPY . /app
RUN exec sh && pnpm run build

EXPOSE 5000
CMD [ "pnpm", "start" ]