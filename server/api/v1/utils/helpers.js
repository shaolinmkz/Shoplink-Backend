import jsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import NodeMailerService from './node_mailer';
import confirmEmailMarkup from './markUp/emailComfirmationMarkup';

dotenv.config();

const { SECRET_KEY } = process.env;

/**
 * @class Helpers
 * @description Specifies reusable helper methods
 * @exports Helpers
 */
export default class Helpers {
  /**
   * @method generateTimedToken
   * @description Generate a timed token
   * @param {object} payload users data
   * @param {object} time
   * @returns {string} Token
   */
  static generateTimedToken(payload, time) {
    return jsonWebToken.sign({
      payload
    }, SECRET_KEY, { expiresIn: time });
  }

  /**
   * @method verifyToken
   * @description Verifies a token and decodes it to its subsequent payload
   * @param {string} token The token to decode
   * @returns {object} The resulting payload
   */
  static verifyToken(token) {
    let payload;
    jsonWebToken.verify(token, SECRET_KEY, (error, decoded) => {
      payload = '';
      if (!error) {
        payload = decoded.payload;
      }
    });
    return payload;
  }

  /**
   * @method hashPassword
   * @description Hashes a users password
   * @param {string} password The users password
   * @returns {string} The resulting hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, 8);
  }

  /**
   * @method comparePassword
   * @description Hashes a users password
   * @param {string} value The string
   * @param {string} hash The users hashed password/email
   * @returns {boolean} returns a boolean is the comparism is valid
   */
  static decryptHash(value, hash) {
    return bcrypt.compareSync(value, hash);
  }

  /**
   * @method setEnvironmentVariable
   * @description sets an environment variable
   * @param {string} key - key string
   * @param {string} value - value string
   * @returns {undefined}
   */
  static setEnvironmentVariable(key, value) {
    if (process.env.TEST_ENV) process.env[key] = value;
  }

  /**
   * @method sendConfirmatonMail
   * @description Send a confirmation mail
   * @param {object} data
   * @returns {undefined}
   */
  static sendConfirmatonMail({ firstName, lastName, email, uniqueToken }) {
    const fullName = `${firstName} ${lastName}`;
    const expiryTime = 60 * 60 * 2; // 2 days
    const hashedToken = Helpers.hashPassword(uniqueToken);
    const timedToken = Helpers.generateTimedToken(hashedToken, expiryTime);
    const mailOptions = {
      from: 'ShopLink🔗 <ireporter18@gmail.com>',
      to: email,
      subject: 'Email Verification✓',
      html: confirmEmailMarkup(fullName, email, timedToken)
    };
    NodeMailerService.sendEmail(mailOptions);
  }

  /**
   * Abstraction of returned user details
   * @param {Object} user user object gotten from database
   * @param {String} token authentication token
   * @returns {Object} parsed user object
   */
  static setUserDetails(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address1: user.address1,
      address2: user.address2,
      state: user.state,
      lga: user.lga,
      postalCode: user.postalCode,
      shippingRegion: user.shippingRegion,
      phone1: user.phone1,
      phone2: user.phone2,
      role: user.role,
      profileImage: user.profileImage,
      isEmailVerified: user.isEmailVerified,
      isSocialMediaAuth: user.isSocialMediaAuth,
    };
  }

  /**
   * @method extractUserDetails
   * @description extract and format user details via facebook auth
   * @param {object} userCredentials
   * @returns {undefined}
   */
  static extractUserDetails(userCredentials) {
    const { displayName, photos, emails } = userCredentials;
    const nameSplit = displayName.split(' ');
    return {
      firstName: nameSplit[0],
      lastName: nameSplit[nameSplit.length - 1],
      profileImage: photos[0].value,
      email: emails[0].value,
    };
  }

  /**
   * @method handleFacebookDetails
   * @description extract and format user details via facebook auth
   * @param {object} accessToken
   * @param {object} refreshToken
   * @param {object} profile
   * @param {object} callback
   * @returns {undefined}
   */
  static handleFacebookDetails(accessToken, refreshToken, profile, callback) {
    process.nextTick(() => {
      const { displayName, photos, emails } = profile;
      callback(null, { data: { displayName, photos, emails } });
    });
  }
}
