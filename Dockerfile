FROM node:14-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install --silent

COPY . .

RUN npm run build

# Nginx Image 
FROM nginx:latest

# 리액트 빌드파일 복사
COPY --from=build /app/build /usr/share/nginx/build
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx server 
CMD ["nginx", "-g", "daemon off;"]

 

