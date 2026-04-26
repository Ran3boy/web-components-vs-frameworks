# Этап 1: Сборка приложения
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Этап 2: Раздача статики через Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html/web-components-vs-frameworks

# Настраиваем безопасный редирект с корня на папку приложения
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location = / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        return 302 /web-components-vs-frameworks/;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]