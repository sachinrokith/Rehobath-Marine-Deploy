# ---------- Stage 1: Build React ----------
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- Stage 2: Nginx Server ----------
FROM nginx:alpine

# remove default config
RUN rm -rf /etc/nginx/conf.d/default.conf

# copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy build files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
