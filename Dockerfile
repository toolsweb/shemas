FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install -g migrate-mongo
RUN npm install -g nodemon
RUN npm install -g concurrently

RUN npm install


#RUN migrate-mongo up



EXPOSE 3000

CMD ["nodemon", "app.js"]
