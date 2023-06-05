import express, { Application } from 'express'
import session from 'express-session'
import RedisStore from 'connect-redis'
import morgan from 'morgan'

// Routes
import {indexRoute} from './apis/index.route'
import {tweetRoute} from './apis/tweet/tweet.route'
import {likeRoute} from './apis/like/like.route'
import { signInRoute, } from './apis/sign-in/sign-in.route'
import { SignOutRoute } from './apis/sign-out/sign-out.route'
import { profileRoute } from './apis/profile/profile.route'
import { imageUploadRoute } from './apis/image-upload/image-upload.route'
import { signUpRoute } from './apis/sign-up/signup.route'
import { createClient, RedisClientType } from 'redis'

// The following class creates the frontend and instantiates the server
export class App {
  app: Application
  redisClient: RedisClientType
  redisStore : RedisStore

  constructor (
    private readonly port: number,
  ) {
    this.redisClient = createClient({ socket: { host: process.env.REDIS_HOST } })
    this.redisClient.connect().catch(console.error)

    this.redisStore = new RedisStore({client: this.redisClient})
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  // private method that sets the port for the sever, to one from index.route.ts, and external .env file or defaults to 3000
  private settings (): void {
    this.app.set('port', this.port)
  }

  // private method to setting up the middleware to handle json responses, one for dev and one for prod
  private middlewares (): void {
    const sessionConfig = {
      store: this.redisStore,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    }
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(session(sessionConfig))
  }

  // private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
  private routes (): void {
    this.app.use('/apis', indexRoute)
    this.app.use('/apis/tweet', tweetRoute)
    this.app.use('/apis/sign-in', signInRoute)
    this.app.use('/apis/sign-out', SignOutRoute)
    this.app.use('/apis/sign-up', signUpRoute)
    this.app.use('/apis/like', likeRoute)
    this.app.use('/apis/profile', profileRoute)
    this.app.use('/apis/image-upload', imageUploadRoute)
  }

  // starts the server and tells the terminal to post a message that the server is running and on what port
  async listen (): Promise<void> {
    await this.app.listen(this.app.get('port'))
    console.log('Server on port', this.app.get('port'))
  }
}


