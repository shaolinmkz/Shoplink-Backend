import { Response, Helpers } from '../utils';
import { FindOneOrAll } from '../services';

const { verifyToken, decryptHash } = Helpers;
const { findOne } = FindOneOrAll;

/**
 * @class ValidateUser
 * @description Class for user validation
 */
export default class ValidateUser {
  /**
   * @method verifyUser
   * @description function to verify a users token
   * @param {object} req - the request object
   * @param {object} res - the reponse object
   * @param {function} next the next middleware
   * @returns {boolean} whether the user is unique or not
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization || req.query.token;
    const validToken = verifyToken(token);
    if (!validToken) {
      return Response.error({ req, res, statusCode: 400, data: { message: 'Reactivation link has expired' } });
    }
    req.decoded = validToken;
    return next();
  }

  /**
   * @method validateUser
   * @description function to validate a user exist
   * @param {object} req - the request Object
   * @param {object} res - the response Object
   * @param {function} next - the next middleware
   * @returns {boolean} whether the user is unique and exist
   */
  static async validateUser(req, res, next) {
    const { body } = req;
    const params = { email: body.email };
    try {
      const checkUser = await findOne('User', params);
      if (checkUser) {
        req.user = checkUser.dataValues;
      }
      next();
    } catch (error) {
      return Response.error({ req, res, statusCode: 500, data: { error } });
    }
  }

  /**
   * @method existingUser
   * @description check if user exist
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   * @returns {undefined}
   */
  static async existingUser(req, res, next) {
    const { user } = req;

    if (user) {
      return Response.error({ req,
        res,
        statusCode: 409,
        data: { message: 'User already exist' }
      });
    }
    return next();
  }

  /**
   * @method validateLogin
   * @description validate user credentials
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - the next middleware
   * @returns {undefined}
   */
  static validateLogin(req, res, next) {
    if (!req.user) return Response.error({ req, res, statusCode: 401, data: { message: 'User does not exist.' } });
    const loginUser = req.user;
    const isPasswordCorrect = decryptHash(req.body.password, loginUser.password);
    if (isPasswordCorrect) {
      next();
    } else Response.error({ req, res, statusCode: 401, data: { message: 'Wrong email or password.' } });
  }

  /**
   * @method validateEmailConfirmationURL
   * @description validate users email comfirmation url
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {callback} next
   * @return {undefined}
   */
  static async validateEmailConfirmationURL(req, res, next) {
    const { query: { email }, decoded } = req;
    let hasError = false;

    const user = await findOne('User', { email });

    if (user) {
      hasError = ValidateUser.validateEmailConfirmationHash({ req, res, user, decoded });
    } else {
      hasError = true;
      Response.error({ req, res, statusCode: 404, data: { message: 'User does not exist.' } });
    }

    if (!hasError) {
      req.validUser = user;
      next();
    }
  }

  /**
   * @method validateEmailConfirmationHash
   * @description checks if the hash is valid
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} user
   * @param {string} decoded
   * @returns {undefined}
   */
  static validateEmailConfirmationHash({ req, res, user, decoded }) {
    const isValidToken = decryptHash(user.uniqueToken, decoded);
    let error = false;
    if (!isValidToken) {
      Response.error({ req, res, statusCode: 400, data: { message: 'Invalid reactivation link' } });
      error = true;
    }

    if (user.isEmailVerified && !error) {
      Response.error({ req, res, statusCode: 400, data: { message: 'Your email have been verified already' } });
      error = true;
    }
    return error;
  }
}
