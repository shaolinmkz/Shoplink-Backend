import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import { Helpers } from '../server/utils';

chai.use(chaiHttp);
const { expect } = chai;

const mockUser = {
  firstName: 'Michael',
  lastName: 'Obiora',
  email: 'mcemie4eva@gmail.com',
  password: 'mockpassword12345;'
};

const mockUser2 = {
  firstName: 'Emeka',
  lastName: 'Obasi',
  email: 'mockUser2@gmail.com',
  password: 'mockpassword12345;'
};

const mockConfirmEmailHash = Helpers.hashPassword('asdfghjkl;');
const mockConfirmEmailToken = Helpers.generateTimedToken(mockConfirmEmailHash,
  60 * 60 * 2);

const registrationURL = '/customer/register';
const resendConfirmationEmailUrl = '/resend-confirmation-emails';
const invalidEmailConfirmationURL = '/email-confirmation?email=mcemie4eva@gmail.com&token=invalidToken';
const emailConfirmationURL = `/email-confirmation?email=mcemie4eva@gmail.com&token=${mockConfirmEmailToken}`;
let uniqueToken;
let userToken;

describe('Test the registration route', () => {
  it('should register a user', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send(mockUser)
      .end((req, res) => {
        const { message, expiresIn, customer } = res.body;
        expect(res.status).to.equal(201);
        expect(customer.email).to.equal(mockUser.email);
        expect(expiresIn).to.equal('48 hours');
        expect(message).to.equal('user created successfully');
        uniqueToken = process.env.UNIQUE_TOKEN;
        done(req);
      });
  });

  it('should return a 409 if a user already exists', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send(mockUser)
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(409);
        expect(message).to.equal('User already exist');
        done(req);
      });
  });

  it('should return a 422 if a firstName has an invalid dataType', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send({ ...mockUser, firstName: 2 })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('firstName should be a string');
        done(req);
      });
  });

  it('should return a 422 if a firstName input has a character length of zero(0)', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send({ ...mockUser, firstName: '' })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('firstName is required');
        done(req);
      });
  });

  it('should return a 422 if a lastName input has an invalid dataType', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send({ ...mockUser, lastName: 2 })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('lastName should be a string');
        done(req);
      });
  });

  it('should return a 422 if a lastName input has a character length of zero(0)', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send({ ...mockUser, lastName: '' })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('lastName is required');
        done(req);
      });
  });

  it('should return a 422 if a email input has an invalid dataType', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send({ ...mockUser, email: 2 })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('email should be a string');
        done(req);
      });
  });

  it('should return a 422 if a email input is invalid', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send({ ...mockUser, email: 'bad_email.com' })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('invalid email format');
        done(req);
      });
  });

  it('should return a 422 if a password input is invalid', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send({ ...mockUser, password: 'pass' })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('minimum character length for password should be 6');
        done(req);
      });
  });

  it('should return a 422 if a password input has an invalid dataType', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send({ ...mockUser, password: 2 })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('password should be a string');
        done(req);
      });
  });
});

describe('Test the email confirmation URL route', () => {
  it('should return a 400 if the email confirmation URL has expired', (done) => {
    chai
      .request(app)
      .get(invalidEmailConfirmationURL)
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(400);
        expect(message).to.equal('Reactivation link has expired');
        done(req);
      });
  });

  it("should return a 400 if the decrypted email confirmation URL token doesn't match the Id", (done) => {
    chai
      .request(app)
      .get(emailConfirmationURL)
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(400);
        expect(message).to.equal('Invalid reactivation link');
        done(req);
      });
  });

  it('should return a 200 if the email confirmation url is valid', (done) => {
    const hash = Helpers.hashPassword(uniqueToken);
    const token = Helpers.generateTimedToken(hash, 60 * 60 * 2);
    const validEmailConfirmationURL = `/email-confirmation?email=mcemie4eva@gmail.com&token=${token}`;
    chai
      .request(app)
      .get(validEmailConfirmationURL)
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message).to.equal('Your email has been confirmed');
        done(req);
      });
  });

  it('should return a 400 if the email has already being confirmed', (done) => {
    const hash = Helpers.hashPassword(uniqueToken);
    const token = Helpers.generateTimedToken(hash, 60 * 60 * 2);
    const validEmailConfirmationURL = `/email-confirmation?email=mcemie4eva@gmail.com&token=${token}`;
    chai
      .request(app)
      .get(validEmailConfirmationURL)
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(400);
        expect(message).to.equal('Your email have been verified already');
        done(req);
      });
  });

  it('should return a 404 if the email is not found on the database', (done) => {
    const hash = Helpers.hashPassword(uniqueToken);
    const token = Helpers.generateTimedToken(hash, 60 * 60 * 2);
    const validEmailConfirmationURL = `/email-confirmation?email=fakeuser@yahoo.com&token=${token}`;
    chai
      .request(app)
      .get(validEmailConfirmationURL)
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(404);
        expect(message).to.equal('User does not exist.');
        done(req);
      });
  });
});

describe('Resend email verification link', () => {
  it('should register a user', (done) => {
    chai
      .request(app)
      .post(registrationURL)
      .send(mockUser2)
      .end((req, res) => {
        const { message, expiresIn, customer, accessToken } = res.body;
        userToken = accessToken;
        expect(res.status).to.equal(201);
        expect(customer.email).to.equal(mockUser2.email);
        expect(expiresIn).to.equal('48 hours');
        expect(message).to.equal('user created successfully');
        uniqueToken = process.env.UNIQUE_TOKEN;
        done(req);
      });
  });

  it('should send a new verification email', (done) => {
    chai
      .request(app)
      .post(resendConfirmationEmailUrl)
      .set({ authorization: userToken })
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message).to.equal('A new verification link has been sent to your registered mail.');
        done(req);
      });
  });
});
