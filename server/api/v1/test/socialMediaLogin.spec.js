import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import MockStrategy from 'passport-mock-strategy';
import app from '../../../app';
import passport from '../socialMediaAuth/config';
import { Helpers } from '../utils';
import { ValidateUser } from '../middleware';

const { verifySocialLogin } = ValidateUser;

const { handleFacebookDetails } = Helpers;

chai.use(chaiHttp);
const mockFacebookUser = {
  emails: [{ value: 'mockfacebookuser@yahoo.com' }],
  displayName: 'mock facebook user',
  photos: [{ value: 'profileURL' }],
};

passport.use(new MockStrategy());

passport.use(new MockStrategy({
  name: 'facebook',
  user: mockFacebookUser
}, (user, done) => {
  done(null, { data: user });
}));

const mockUser = {
  email: 'mockfacebookuser@yahoo.com',
  password: 'unregisteredpassword'
};

const loginEndpoint = '/api/v1/customer/login';
const facebookLoginEndpoint = '/api/v1/auth/facebook/callback';

describe('Login with facebook', () => {
  it('should login a user', (done) => {
    chai
      .request(app)
      .get(facebookLoginEndpoint)
      .end((err, res) => {
        const { message, expiresIn, customer, status } = res.body;
        const splitName = mockFacebookUser.displayName.split(' ');
        expect(res.status).to.equal(200);
        expect(status).to.equal('success');
        expect(customer.firstName).to.equal(splitName[0]);
        expect(customer.lastName).to.equal(splitName[splitName.length - 1]);
        expect(customer.isSocialMediaAuth).to.equal(true);
        expect(customer.isEmailVerified).to.equal(true);
        expect(customer.profileImage).to.equal(mockFacebookUser.photos[0].value);
        expect(customer.email).to.equal(mockFacebookUser.emails[0].value);
        expect(expiresIn).to.equal('48 hours');
        expect(message).to.equal('User successfully logged in');
        done(err);
      });
  });

  it('should login a user if the email already exist on the database', (done) => {
    chai
      .request(app)
      .get(facebookLoginEndpoint)
      .end((err, res) => {
        const { message, customer } = res.body;
        expect(res.status).to.equal(200);
        expect(customer.isSocialMediaAuth).to.equal(true);
        expect(customer.isEmailVerified).to.equal(true);
        expect(customer.email).to.equal(mockFacebookUser.emails[0].value);
        expect(message).to.equal('User successfully logged in');
        done(err);
      });
  });

  it('should return a 401 if user tries to login with an email that has a social media signature', (done) => {
    chai
      .request(app)
      .post(loginEndpoint)
      .send(mockUser)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(401);
        expect(message).to.equal('This email is registered with a social media login');
        done(err);
      });
  });
});

describe('Facebook Helper Method', () => {
  const mockCallback = (a, b) => ({ a, b });

  it('should mock the facebook helper method', () => {
    handleFacebookDetails(null, null, mockFacebookUser, mockCallback);
    expect(mockCallback('a', 'b')).to.be.an('object');
    expect(mockCallback('a', 'b').a).to.equal('a');
    expect(mockCallback('a', 'b').b).to.equal('b');
  });
});

describe('Facebook Validate User Method', () => {
  const res = {
    status: (statusCode) => ({ json: (anything) => (`${anything} ${statusCode}`) })
  };
  const next = () => {};

  it('should mock the facebook verifySocialLogin method ERROR query param', () => {
    const req = {
      query: {
        error: 'valid error',
        denied: null
      },
    };

    const middleware = verifySocialLogin(req, res, next);
    expect(typeof middleware).to.equal('object');
  });

  it('should mock the facebook verifySocialLogin method DENIED query param', () => {
    const req = {
      query: {
        error: null,
        denied: 'valid denied'
      },
    };

    const middleware = verifySocialLogin(req, res, next);
    expect(typeof middleware).to.equal('object');
  });
});
