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
    next();
  }

  /**
   * @method validateUser
   * @description validates a user exist
   * @param {object} req - the request Object
   * @param {object} res - the response Object
   * @param {function} next - the next middleware
   * @returns {boolean} whether the user is unique and exist
   */
  static async validateUser(req, res, next) {
    const { body, decoded, query } = req;
    const params = { email: body.email || decoded.email || query.email };
    try {
      const checkUser = await findOne('User', params);
      if (checkUser) {
        req.user = checkUser;
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
  static existingUser(req, res, next) {
    const { user } = req;

    if (user) {
      return Response.error({ req,
        res,
        statusCode: 409,
        data: { message: 'User already exist' }
      });
    }
    next();
  }

  /**
   * @method validateUserExists
   * @description check if user exist
   * @param {object} req - the request object
   * @param {object} res - the response object
   * @param {callback} next - the next middleware
   * @returns {undefined}
   */
  static validateUserExists(req, res, next) {
    if (!req.user) {
      return Response.error({ req, res, statusCode: 404, data: { message: 'User does not exist.' } });
    }
    next();
  }

  /**
   * @method validateLogin
   * @description validate user login credentials
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - the next middleware
   * @returns {undefined}
   */
  static validateLogin(req, res, next) {
    const loginUser = req.user;
    const isPasswordCorrect = decryptHash(req.body.password, loginUser.password);
    if (isPasswordCorrect) {
      next();
    } else Response.error({ req, res, statusCode: 401, data: { message: 'Wrong email or password.' } });
  }

  /**
   * @method validateEmailConfirmationHash
   * @description checks if the hash is valid
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - the next middleware function to invoke
   * @param {string} decoded
   * @returns {undefined}
   */
  static validateEmailConfirmationHash(req, res, next) {
    const { user, decoded } = req;
    const isValidToken = decryptHash(user.uniqueToken, decoded);
    if (!isValidToken) {
      return Response.error({ req, res, statusCode: 400, data: { message: 'Invalid reactivation link' } });
    }
    next();
  }

  /**
   * @method isEmailVerified
   * @description checks if the user's email has already been verified
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - the next middleware function to invoke
   * @returns {undefined}
   */
  static isEmailVerified(req, res, next) {
    const { dataValues: { isEmailVerified } } = req.user;
    if (isEmailVerified) {
      return Response.error({ req, res, statusCode: 400, data: { message: 'Your email have been verified already' } });
    }
    next();
  }
}
