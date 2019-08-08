FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g migrate-mongo
RUN npm install -g nodemon
RUN npm install

COPY . .

RUN migrate-mongo up



EXPOSE 3000

CMD ["nodemon"]
