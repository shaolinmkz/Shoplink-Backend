import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

const departmentsEndpoint = '/api/v1/departments';

describe('Test the get all departments route', () => {
  it('should get all departments', (done) => {
    chai
      .request(app)
      .get(departmentsEndpoint)
      .end((req, res) => {
        const { method, status, departments } = res.body;
        expect(res.status).to.equal(200);
        expect(method).to.equal('GET');
        expect(status).to.equal('success');
        expect(departments).to.be.an('array');
        done();
      });
  });
});
