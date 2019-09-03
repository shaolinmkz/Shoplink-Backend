import { v4 as generateId } from 'uuid';
import { Response, Helpers } from '../utils';
import { CreateRecord, UpdateRecord } from '../services';

const {
  hashPassword,
  setUserDetails,
  generateTimedToken,
  setEnvironmentVariable,
  sendConfirmatonMail,
} = Helpers;

const { createRecord } = CreateRecord;
const { updateRecord } = UpdateRecord;

/**
 * @class Users
 * @description Controller to authenticate users
 * @exports Users
 */
export default class Users {
  /**
   * @description controller function that handles the creation of a User
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {undefined}
   */
  static async register(req, res) {
    const uniqueToken = generateId();
    const id = generateId();
    setEnvironmentVariable('UNIQUE_TOKEN', uniqueToken); // for test purpose
    try {
      const { firstName, lastName, email, password } = req.body;
      const inputs = { firstName, lastName, email, password, uniqueToken };
      const hash = hashPassword(password);
      const createUser = await createRecord('User', { id, ...inputs, password: hash });
      const customer = setUserDetails(createUser);
      await sendConfirmatonMail(inputs);
      Response.success({ req,
        res,
        statusCode: 201,
        data: {
          customer,
          accessToken: generateTimedToken({ id: customer.id, email }, '2d'),
          expiresIn: '48 hours',
          message: 'user created successfully'
        }
      });
    } catch (error) {
      return Response.error({ req, res, statusCode: 500, data: { error } });
    }
  }

  /**
   * @description confirm users email
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {undefined}
   */
  static async confirmEmail(req, res) {
    try {
      const { query: { email } } = req;
      await updateRecord('User', { isEmailVerified: true }, { email });
      Response.success({ req,
        res,
        statusCode: 200,
        data: { message: 'Your email has been confirmed' }
      });
    } catch (error) {
      return Response.error({ req, res, statusCode: 500, data: error });
    }
  }

  /**
   * @description controller function that handles resending of email verification
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {undefined}
   */
  static async resendConfirmationEmail(req, res) {
    try {
      const { user } = req;
      const uniqueToken = generateId();
      setEnvironmentVariable('UNIQUE_TOKEN', uniqueToken); // for test purpose
      const { firstName, lastName, email } = user.dataValues;
      await updateRecord('User', { uniqueToken }, { email });
      await sendConfirmatonMail({ firstName, lastName, email, uniqueToken });
      Response.success({ req,
        res,
        statusCode: 200,
        data: { message: 'A new verification link has been sent to your registered mail.' }
      });
    } catch (error) {
      return Response.error({ req, res, statusCode: 500, data: { error } });
    }
  }

  /**
   * @description login users with email
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {undefined}
   */
  static async login(req, res) {
    const customer = setUserDetails(req.user.dataValues);
    Response.success({ req,
      res,
      statusCode: 200,
      data: {
        customer,
        accessToken: generateTimedToken({
          id: customer.id,
          email: customer.email }, '2d'),
        expiresIn: '48 hours',
        message: 'User successfully logged in'
      }
    });
  }
}
