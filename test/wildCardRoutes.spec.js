import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test the wild card routes ', () => {
  it('should test the root route', (done) => {
    chai
      .request(app)
      .get('/')
      .end((req, res) => {
        const { method, message, status } = res.body;
        expect(res.status).to.equal(200);
        expect(status).to.equal('success');
        expect(method).to.equal('GET');
        expect(message).to.equal('Welcome to Shoplink');
        done(req);
      });
  });

  it('should test the non-existent route', (done) => {
    chai
      .request(app)
      .post('/api/v1/non-existent-route')
      .end((req, res) => {
        const { method, message, status } = res.body;
        expect(res.status).to.equal(404);
        expect(method).to.equal('POST');
        expect(status).to.equal('error');
        expect(message).to.equal("Oops! What your looking for isn't here");
        done(req);
      });
  });
});
