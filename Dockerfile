FROM punix/tweetimage:latest
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8181
CMD [ "npm", "start" ]
