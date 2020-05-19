FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY install/package.json /usr/src/app/package.json

RUN npm install --only=prod && \
    npm cache clean --force

COPY plugins/nodebb-plugin-composer-default ./nodebb_modules/nodebb-plugin-composer-default

COPY plugins/nodebb-plugin-announcements ./nodebb_modules/nodebb-plugin-announcements
    
COPY . /usr/src/app

ENV NODE_ENV=production \
    daemon=false \
    silent=false

EXPOSE 4567

CMD node ./nodebb build ;  node ./nodebb start
