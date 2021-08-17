import { App } from './App';
import {Profile} from './utils/interfaces/Profile';

declare module 'express-session' {
  export interface SessionData {
    profile: Profile|undefined;
    signature: string|undefined;
    jwt: string|undefined
  }
}

// instantiate new frontend and pass it a port as an argument to start with (4200)
async function main () {
  try {
    const app = new App(4200);
    await app.listen();
  } catch (e) {
    console.error(e)
  }
}

main().catch(error => console.error(error) );
