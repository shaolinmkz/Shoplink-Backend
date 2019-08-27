import express from 'express';
import { Users } from '../controller/index';
import { ValidateUser, captureErrors, validateSignUpFields } from '../middleware';

const customer = express.Router();

customer.post('/customer',
  validateSignUpFields,
  captureErrors,
  ValidateUser.existingUser,
  Users.register);

customer.get('/email-confirmation',
  ValidateUser.validateEmailConfirmationURL,
  Users.confirmEmail);

export default customer;
