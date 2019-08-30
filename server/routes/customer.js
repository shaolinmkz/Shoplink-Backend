import express from 'express';
import { Users } from '../controller/index';
import { ValidateUser, captureErrors, nameValidator, validateEmail, validatePassword } from '../middleware';

const customer = express.Router();

const { register, login, confirmEmail } = Users;

const {
  existingUser,
  validateLogin,
  validateEmailConfirmationURL,
  validateUser,
  verifyToken
} = ValidateUser;

customer.post('/customer/register',
  [...nameValidator, validateEmail, validatePassword],
  captureErrors,
  validateUser,
  existingUser,
  register);

customer.get('/email-confirmation',
  verifyToken,
  validateEmailConfirmationURL,
  confirmEmail);

customer.post('/customer/login',
  [validateEmail, validatePassword],
  captureErrors,
  validateUser,
  validateLogin,
  login);

export default customer;
