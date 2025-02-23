FROM node:18 AS frontend-build

# FRONT
WORKDIR /app/frontend

# Build Front
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build


# BACK
FROM node:18 AS backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000

# Script
CMD ["npm", "run", "start"]
