FROM node:7.7-alpine

#RUN addgroup -S app && adduser -S -g app app &&\
RUN npm install --global pm2

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/hapi/
#RUN chown -R app:app $HOME/*

#USER app
WORKDIR $HOME/hapi
RUN npm install

#USER root
COPY . $HOME/hapi
#RUN chown -R app:app $HOME/*
#USER app

CMD ["pm2-docker", "process.yml", "--raw", "--only", "HS"]
