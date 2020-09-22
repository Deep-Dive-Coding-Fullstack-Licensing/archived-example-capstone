import passport from 'passport';
import passportLocal, { Strategy } from 'passport-local';

import {Profile} from "../interfaces/Profile";
import {selectProfileByProfileEmail} from "../profile/selectProfileByProfileEmail";

const LocalStrategy = passportLocal.Strategy;

const passportStrategy : Strategy = new LocalStrategy(
    {
        usernameField: 'profileEmail',
        passwordField: "profilePassword"
    },
    async (email, password, done) => {
  try {

    const profile : Profile | undefined = await selectProfileByProfileEmail(email);
    return profile ? done(null, profile) : done(undefined, undefined, { message: 'Incorrect username or password'});
  }
  catch (error) {
    return done(error);
  }
});

export const  passportMiddleware = passport.use(passportStrategy);
