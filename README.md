# Deep Dive Twitter
This is an example capstone that contains a Twitter-like application.  

## Set Up
**The following files are required to start a new project based on this code base**
1. `/.gitignore`
    * Your own version created based on `example.gitignore`
2. `/.env`
    * Your own version created based on `example.env`
3. `/docker-compose.yml`
    * File to orchestrate the mysql database container
4. `/docker-compose.env`
    * File containing the env variables for the mysql database container
3. `/backend/src/controllers/index.controller.ts`
    * This file initiates a generic API controller that returns a string message when hit
4. `/backend/src/routes/index.routes.ts`
    * This file initiates a generic API route to test the controller in index.controller
5. `/backend/src/app.ts`
    * This file sets up the server to run on the provided port (5000 as set in index.ts) or default to 3000. It also sets up routing and the middleware for handling JSON responses
6. `/backend/src/database.utils.ts`
    * This file sets up the database connection. Your connection details will be different
7. `/backend/src/index.ts`
    * This file instantiates the app. This is the entry point.
8. `/backend/package.json`
    * package.json for the backend code base
9. `/backend/tsconfig.json`
    * configuration file for typescript
10. `/sql/Dockerfile`
    * file to create a custom mysql image
11. `/sql/ddc-twitter.sql`
    * File containing create table statements to initialize the database
12. `/sql/dump.sql`
    * File that contains a mysql data dump to initialize data in the database

## Run Project
1. `cd` into the root directory
2. Run `npm i`
3. Run `docker-compose up -d` to start the application
4.  Optional seed the database 
    * `docker container exec -it CONTAINER_NAME /bin/bash` to gain shell access to the container running the mysql instance.
    * `mysql -u username -p database` to gain access to the mysql cli
    * `source /dump.sql` to execute a data-dump into the database
## Calling API (In Postman or Insomnia)
The routes are formed as follows:
http://`[server]`:`[port]`/api /`[object]`/`[how we want to get it]`:`[param]`

