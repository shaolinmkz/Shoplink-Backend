import jsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { SECRET_KEY } = process.env;

/**
 * @class Helpers
 * @description Specifies reusable helper methods
 * @exports Helpers
 */
class Helpers {
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
    jsonWebToken.verify(token, SECRET_KEY, async (error, decoded) => {
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
}

export default Helpers;
