import chai from 'chai';
import { Helpers } from '../server/utils';

const { expect } = chai;

describe('Test the SET ENVIRONMENT Helper method', () => {
  it('should not set anything', () => {
    Helpers.setEnvironmentVariable('NEWSET', 'something');
    expect(process.env.NEWSET).to.equal(undefined);
  });

  it('should set TEST_ENV to true', () => {
    process.env.TEST_ENV = 'true';
    Helpers.setEnvironmentVariable('NEWSET', 'something');
    expect(process.env.NEWSET).to.equal('something');
    expect(JSON.parse(process.env.TEST_ENV)).to.eql(true);
  });
});
