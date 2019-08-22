import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;

const mockUser = {
  email: 'mcemie4eva@gmail.com',
  password: 'mockpassword12345;'
};

const loginEndpoint = '/customer/login';

describe('Test the login route', () => {
  it('should login a user', (done) => {
    chai
      .request(app)
      .post(loginEndpoint)
      .send(mockUser)
      .end((req, res) => {
        const { message, expiresIn, customer } = res.body;
        expect(res.status).to.equal(200);
        expect(customer.email).to.equal(mockUser.email);
        expect(expiresIn).to.equal('48 hours');
        expect(message).to.equal('User successfully logged in');
        done(req);
      });
  });

  it('should return a 422 if a email input has an invalid dataType', (done) => {
    chai
      .request(app)
      .post(loginEndpoint)
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
      .post(loginEndpoint)
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
      .post(loginEndpoint)
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
      .post(loginEndpoint)
      .send({ ...mockUser, password: 2 })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(422);
        expect(errors[0].message).to.equal('password should be a string');
        done(req);
      });
  });

  it('should return a 401 error status code if password sent is incorrect', (done) => {
    chai
      .request(app)
      .post(loginEndpoint)
      .send({ ...mockUser, password: 'bad-password' })
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(401);
        expect(message).to.equal('Wrong email or password.');
        done(req);
      });
  });

  it('should return a 401 error status code if user is not found.', (done) => {
    chai
      .request(app)
      .post(loginEndpoint)
      .send({ email: 'aaaa@gmail.com', password: 'bad_password' })
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(401);
        expect(message).to.equal('User does not exist.');
        done(req);
      });
  });
});
