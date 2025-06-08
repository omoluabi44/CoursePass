# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json .

# RUN npm install --legacy-peer-deps

# COPY . .

# EXPOSE 3000

# CMD ["npm","start"] 
# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install  --legacy-peer-deps
COPY . .
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
