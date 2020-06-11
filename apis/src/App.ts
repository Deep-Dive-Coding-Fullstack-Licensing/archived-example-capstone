import express, {Application, Errback, ErrorRequestHandler, NextFunction, Request, Response} from 'express';
import TweetRoute from './routes/tweet.route';
import SignupRoute from './routes/signup.route';
import morgan from 'morgan';

// Routes
import IndexRoutes from './routes/index.route';
import { SignInRouter } from './routes/sign-in.route';
import { passportMiddleware } from './lib/auth.controller';
const session = require("express-session");
import passport = require('passport');
import {SignOutRoute} from "./routes/sign-out.route";
const MemoryStore = require('memorystore')(session);
import csrf from "csurf";


// The following class creates the app and instantiates the server
export class App {
    app: Application;

    constructor (
        private port?: number | string
    ) {
      passportMiddleware; // eslint-disable-line
      this.app = express();
      this.settings();
      this.middlewares();
      this.routes();
    }

    // private method that sets the port for the sever, to one from index.route.ts, and external .env file or defaults to 3000
    private settings () {
      this.app.set('port', this.port || process.env.PORT || 3000);
    }


    // private method to setting up the middleware to handle json responses, one for dev and one for prod
    private middlewares () {

      const sessionConfig  =  {
        store: new MemoryStore({
          checkPeriod: 10800
        }),
        secret:"secret",
        saveUninitialized: true,
        resave: true,
        maxAge: "3h"
      };

      this.app.use(morgan('dev'));
      this.app.use(express.json());
      this.app.use(session(sessionConfig));
      this.app.use(passport.initialize());
      this.app.use(passport.session());
      this.app.use(csrf({cookie:false}));
      this.app.use(function (error: any, request : Request, response : Response, next: NextFunction ) {
        if (error.code !== 'EBADCSRFTOKEN') return next(error)

        // handle CSRF token errors here
        response.status(403)

        return response.json({status: 403, message: "xsrf is invalid"})
      })
    }

    // private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
    private routes () {
    this.app.use(IndexRoutes);
    this.app.use('/apis/tweet', TweetRoute);
    this.app.use('/apis/sign-in', SignInRouter);
    this.app.use("/apis/sign-out", SignOutRoute);
    this.app.use('/apis/sign-up', SignupRoute);

  }

    // starts the server and tells the terminal to post a message that the server is running and on what port
    async listen (): Promise<void> {
      await this.app.listen(this.app.get('port'));
      console.log('Server on port', this.app.get('port'));
    }
}
