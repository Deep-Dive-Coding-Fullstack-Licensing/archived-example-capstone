import express, { Application } from 'express'
import TweetRoute from './apis/tweet/tweet.route'
import SignupRoute from './apis/sign-up/signup.route'
import LikeRoute from './apis/like/like.route'
import morgan from 'morgan'

// Routes
import IndexRoutes from './apis/index.route'
import { SignInRouter } from './apis/sign-in/sign-in.route'
import { SignOutRoute } from './apis/sign-out/sign-out.route'
import { ProfileRoute } from './apis/profile/profile.route'
import { ImageUploadRouter } from './apis/image-upload/image-upload.route'
import session from 'express-session'
import { createClient, RedisClientType } from 'redis'
import RedisStore from 'connect-redis'

// The following class creates the frontend and instantiates the server
export class App {
  app: Application
  redisClient: RedisClientType
  redisStore : RedisStore

  constructor (
    private readonly port: number
  ) {
    this.redisClient = createClient({ legacyMode: true, socket: { host: process.env.REDIS_HOST } })
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

    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(
      this.app.use(session( {
      store: this.redisStore,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false

    })))
  }

  // private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
  private routes (): void {
    this.app.use('/apis', IndexRoutes)
    this.app.use('/apis/tweet', TweetRoute)
    this.app.use('/apis/sign-in', SignInRouter)
    this.app.use('/apis/sign-out', SignOutRoute)
    this.app.use('/apis/sign-up', SignupRoute)
    this.app.use('/apis/like', LikeRoute)
    this.app.use('/apis/profile', ProfileRoute)
    this.app.use('/apis/image-upload', ImageUploadRouter)
  }

  // starts the server and tells the terminal to post a message that the server is running and on what port
  async listen (): Promise<void> {
    await this.app.listen(this.app.get('port'))
    console.log('Server on port', this.app.get('port'))
  }
}


