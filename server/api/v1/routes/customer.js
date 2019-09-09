import express from 'express';
import { Users } from '../controller';
import passport from '../socialMediaAuth/config';
import {
  ValidateUser,
  captureErrors,
  nameValidator,
  validateEmail,
  validatePassword,
} from '../middleware';

const customer = express.Router();

const {
  register,
  login,
  confirmEmail,
  resendConfirmationEmail,
} = Users;

const {
  existingUser,
  validateLogin,
  validateEmailConfirmationHash,
  validateUser,
  verifyToken,
  validateUserExists,
  isEmailVerified,
  loggedInWithSocialMedia,
} = ValidateUser;

customer.post('/customer/register',
  [...nameValidator, validateEmail, validatePassword],
  captureErrors,
  validateUser,
  existingUser,
  register);

customer.get('/email-confirmation',
  verifyToken,
  validateUser,
  validateUserExists,
  validateEmailConfirmationHash,
  isEmailVerified,
  confirmEmail);

customer.post('/resend-confirmation-emails',
  verifyToken,
  validateUser,
  validateUserExists,
  isEmailVerified,
  resendConfirmationEmail);

customer.post('/customer/login',
  [validateEmail, validatePassword],
  captureErrors,
  validateUser,
  validateUserExists,
  loggedInWithSocialMedia,
  validateLogin,
  login);

customer.get('/customer/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

customer.get('/auth/facebook/callback',
  ValidateUser.verifySocialLogin,
  passport.authenticate('facebook', { session: false }),
  ValidateUser.validateFacebookLogin,
  ValidateUser.socialMediaSignUp,
  login);

export default customer;
