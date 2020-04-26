FROM node:12.16-alpine

WORKDIR /usr/servertest
COPY . .
WORKDIR /usr/servertest/lib
WORKDIR /usr/servertest
RUN npm install -qy

EXPOSE 4000

CMD ["npm", "start"]