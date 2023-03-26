FROM node:12-alpine as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:12-alpine as prod

WORKDIR /app

COPY --from=build /app/dist .

RUN npm install -g http-server

EXPOSE 8080

ENTRYPOINT [ "http-server", "--no-dotfiles", "-p", "8080", "." ]