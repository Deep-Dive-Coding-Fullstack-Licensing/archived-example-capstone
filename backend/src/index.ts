import { App } from './App'
import { Profile } from './utils/models/Profile'
import { createClient, RedisClientType} from 'redis'
import RedisStore from 'connect-redis'

declare module 'express-session' {
  export interface SessionData {
    profile: Profile|undefined
    signature: string|undefined
    jwt: string|undefined
  }
}

// instantiate new frontend and pass it a port as an argument to start with (4200)
async function main (): Promise<void> {

  const app = new App(4200)
  await app.listen()
}

main().catch(error => console.error(error))
