import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import { Helpers } from '../utils';

const { handleFacebookDetails } = Helpers;

dotenv.config();

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_APP_CALLBACK_URL
} = process.env;

const facebookConfig = new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: FACEBOOK_APP_CALLBACK_URL,
  profileFields: ['displayName', 'photos', 'email']
}, handleFacebookDetails);

passport.use(facebookConfig);

export default passport;
