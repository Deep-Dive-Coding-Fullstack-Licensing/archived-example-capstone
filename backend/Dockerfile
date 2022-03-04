# https://github.com/BretFisher/node-docker-good-defaults/blob/69c923bc646bc96003e9ada55d1ec5ca943a1b19/Dockerfile
FROM node:16
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
ARG PORT=4200
ENV PORT $PORT
EXPOSE $PORT 9229 9230

WORKDIR ./home/node/app
RUN chown node:node -R ./
USER node
COPY package.json package-lock.json ./
COPY tsconfig.json ./
RUN npm install --no-optional && npm cache clean --force
CMD ["npm", "run", "dev"]