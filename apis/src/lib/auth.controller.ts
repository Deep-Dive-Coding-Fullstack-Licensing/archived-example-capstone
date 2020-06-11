import passport from 'passport';
import passportLocal, { Strategy } from 'passport-local';
import { getProfileByProfileEmail } from './getProfileByProfileEmail';
import {Profile} from "../interfaces/Profile";

const LocalStrategy = passportLocal.Strategy;

const passportStrategy : Strategy = new LocalStrategy(
    {
        usernameField: 'profileEmail',
        passwordField: "profilePassword"
    },
    async (email, password, done) => {
  try {

    const profile : Profile | undefined = await getProfileByProfileEmail(email);

    return profile ? done(null, profile) : done(undefined, undefined, { message: 'Incorrect username or password'});
  }
  catch (error) {
    return done(error);
  }
});

export const  passportMiddleware = passport.use(passportStrategy);
