import express from 'express';
import { Users } from '../controller';
import { ValidateUser, captureErrors, nameValidator, validateEmail, validatePassword } from '../middleware';

const customer = express.Router();

const { register, login, confirmEmail, resendConfirmationEmail } = Users;

const {
  existingUser,
  validateLogin,
  validateEmailConfirmationHash,
  validateUser,
  verifyToken,
  validateUserExists,
  isEmailVerified,
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
  validateLogin,
  login);

export default customer;
