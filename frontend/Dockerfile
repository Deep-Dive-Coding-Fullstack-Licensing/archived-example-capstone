# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14 as build-stage
RUN mkdir /home/node/app
WORKDIR ./home/node/app
RUN chown node:node ./
USER node
COPY package*.json ./
COPY ./ ./
RUN npm install --no-optional && npm cache clean --force
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /home/node/app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]