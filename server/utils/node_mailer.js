import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const {
  SENDER_EMAIL_ADDRESS,
  SENDER_PASSWORD,
} = process.env;

/**
 * @description A node mailer service class
 */
class NodeMailerService {
  /**
   * @description sends mail via google
   * @param {object} mailOptions
   * @returns {undefined}
   */
  static sendEmail(mailOptions) {
    nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SENDER_EMAIL_ADDRESS,
        pass: SENDER_PASSWORD,
      }
    }).sendMail(mailOptions);
  }
}

export default NodeMailerService;
