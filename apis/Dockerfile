# https://github.com/BretFisher/node-docker-good-defaults/blob/69c923bc646bc96003e9ada55d1ec5ca943a1b19/Dockerfile
FROM node:12

ARG NODE_ENV=development

ENV NODE_ENV $NODE_ENV


ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN npm i npm@latest -g

RUN mkdir /home/node/app


WORKDIR ./home/node/app

RUN chown node:node ./

USER node

COPY package.json package-lock.json ./
RUN npm install --no-optional && npm cache clean --force


CMD ["npm", "run", "dev"]

