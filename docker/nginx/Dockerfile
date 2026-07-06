# ---------- Build React ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY client/package*.json ./

RUN npm ci

COPY client/ .

RUN npm run build

# ---------- Nginx ----------
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]