FROM node:16

WORKDIR /var/www

COPY package*.json ./

RUN npm install

copy . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "dev"]