import chai from 'chai';
import { NodeMailerService } from '../utils';

const { expect } = chai;

describe('Node Mailer Callback', () => {
  it('should test the error mock callback', () => {
    const callback = NodeMailerService.nodeMailerCallBack({ error: 'sending failed' }, null);
    expect(callback).to.equal(undefined);
  });

  it('should test the success mock callback', () => {
    const callback = NodeMailerService.nodeMailerCallBack(null, { response: 'email sent' });
    expect(callback).to.equal(undefined);
  });
});
