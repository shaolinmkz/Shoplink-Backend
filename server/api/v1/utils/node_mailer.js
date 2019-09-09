import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';

dotenv.config();

const { log } = console;

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
    const transporter = nodemailer
      .createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: SENDER_EMAIL_ADDRESS,
          pass: SENDER_PASSWORD,
        },
      }));
    transporter.sendMail(mailOptions, NodeMailerService.nodeMailerCallBack);
  }

  /**
   * @description node mailer callback
   * @param {object} error
   * @param {object} info
   * @returns {undefined}
   */
  static nodeMailerCallBack(error, info) {
    if (error) {
      log(`Sending Failed: ${JSON.stringify(error)}`);
    } else {
      log(`Email sent successfully: ${info.response}`);
    }
  }
}

export default NodeMailerService;
