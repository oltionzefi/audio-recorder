# stage 1
FROM node:14.15.1-buster AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=build /app/dist/audio-recorder /usr/share/nginx/html
EXPOSE 80
