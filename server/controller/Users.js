import { v4 as generateId } from 'uuid';
import { Response, Helpers, NodeMailerService } from '../utils';
import confirmEmailMarkup from '../utils/markUp/emailComfirmationMarkup';
import db from '../database/models';

const { User } = db;

/**
 * @description Controller to authenticate users
 * @return {undefined}
 */
export default class Users {
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
      from: 'ShopLink🔗 <email-confirmation@shoplink.com>',
      to: email,
      subject: 'Email Verification✓',
      html: confirmEmailMarkup(fullName, email, timedToken)
    };
    NodeMailerService.sendEmail(mailOptions);
  }

  /**
   * @description controller function that handles the creation of a User
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {undefined}
   */
  static async register(req, res) {
    const uniqueToken = generateId();
    const id = generateId();
    Helpers.setEnvironmentVariable('UNIQUE_TOKEN', uniqueToken); // for test purpose
    try {
      const { firstName, lastName, email, password } = req.body;
      const inputs = { firstName, lastName, email, password, uniqueToken };
      const hash = await Helpers.hashPassword(password);
      const createUser = await User.create({ id, ...inputs, password: hash });
      Users.sendConfirmatonMail(inputs);
      delete createUser.dataValues.password;
      delete createUser.dataValues.uniqueToken;
      return Response.success({
        req,
        res,
        statusCode: 201,
        data: {
          customer: createUser,
          accessToken: Helpers.generateTimedToken({ id: createUser.dataValues.id, email }, '2d'),
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
      await req.validUser.update({ isEmailVerified: true });
      Response.success({
        req,
        res,
        statusCode: 200,
        data: { message: 'your email has been confirmed' }
      });
    } catch (error) {
      return Response.error({ req, res, statusCode: 500, data: error });
    }
  }
}
