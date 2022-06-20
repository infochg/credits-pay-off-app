FROM node as dependencies

COPY . /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn
RUN yarn build

FROM dependencies as builder

FROM nginx:stable

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
