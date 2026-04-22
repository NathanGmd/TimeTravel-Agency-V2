FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances en premier (cache Docker)
COPY package.json ./
RUN npm install --omit=dev

# Copier le code source
COPY src/ ./src/
COPY data/ ./data/

# Exposer le port
EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/health || exit 1

CMD ["node", "src/index.js"]
