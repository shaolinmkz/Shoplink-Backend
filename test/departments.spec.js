import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;

const departmentsEndpoint = '/api/v1/departments';

describe('Test the get all departments route', () => {
  it('should get all departments', (done) => {
    chai
      .request(app)
      .get(departmentsEndpoint)
      .end((req, res) => {
        const { method, status, data: { departments, pagination } } = res.body;
        expect(res.status).to.equal(200);
        expect(method).to.equal('GET');
        expect(status).to.equal('success');
        expect(departments).to.be.an('array');
        expect(pagination).to.have.keys(['totalPages', 'currentPage', 'pageSize', 'totalRecords']);
        done();
      });
  });

  it('should get all departments paginated by the filter and offset parameter to the query object', (done) => {
    chai
      .request(app)
      .get(`${departmentsEndpoint}?offset=3&limit=3`)
      .end((req, res) => {
        const { method, status, data: { departments, pagination } } = res.body;
        expect(res.status).to.equal(200);
        expect(method).to.equal('GET');
        expect(status).to.equal('success');
        expect(departments).to.be.an('array');
        expect(pagination).to.have.keys(['totalPages', 'currentPage', 'pageSize', 'totalRecords']);
        expect(pagination).to.deep.include({
          totalPages: 2,
          currentPage: 2,
          pageSize: 3,
          totalRecords: 6
        });
        done();
      });
  });
});
