
import { App } from './app';

// instantiate new app and pass it a port as an argument to start with (5000)
async function main () {
  try {
    const app = new App(5000);
    await app.listen();
  } catch (e) {
    console.log(e);
  }
}

main();
