import db from '../database/models';
import { Response, Helpers } from '../utils';

const { User } = db;

/**
 * @class ValidateUser
 * @description Class for user validation
 */
class ValidateUser {
  /**
   * @method isUnique
   * @description function for determining if user is unique
   * @param {string} field - database field
   * @param {string} value - value to check for
   * @returns {boolean} whether the user is unique or not
   */
  static async isUnique(field, value) {
    let user;
    try {
      const singleUser = await User.findOne({ where: { [field]: value } });
      if (singleUser) {
        user = singleUser;
      }
      return user;
    } catch (err) {
      return true;
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
    const user = await ValidateUser.isUnique('email', req.body.email);

    if (user) {
      Response.error({
        req,
        res,
        statusCode: 409,
        data: { message: 'user already exist' }
      });
    } else {
      next();
    }
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
    const { email, token } = req.query;
    let hasError = false;
    const decoded = await Helpers.verifyToken(token);

    if (!decoded) {
      return Response.success({ req, res, statusCode: 400, data: { message: 'reactivation link has expired' } });
    }
    const user = await User.findOne({
      where: { email }
    });

    if (user) {
      hasError = ValidateUser.validateEmailConfirmationHash({ req, res, user, decoded });
    } else {
      hasError = true;
      Response.error({ req, res, statusCode: 404, data: { message: 'user not found' } });
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
    const isValidToken = Helpers.decryptHash(user.uniqueToken, decoded);
    let error = false;
    if (!isValidToken) {
      Response.error({ req, res, statusCode: 400, data: { message: 'invalid reactivation link' } });
      error = true;
    }

    if (user.isEmailVerified && !error) {
      Response.error({ req, res, statusCode: 400, data: { message: 'your email have been verified already' } });
      error = true;
    }
    return error;
  }
}

export default ValidateUser;
