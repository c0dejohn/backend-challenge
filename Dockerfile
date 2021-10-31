FROM node:14.10-alpine

RUN mkdir /backend-challenge

WORKDIR /backend-challenge

COPY . /backend-challenge

RUN npm install

EXPOSE 5000

CMD sh boot.sh