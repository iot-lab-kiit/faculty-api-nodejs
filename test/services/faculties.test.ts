import app from '../../src/app';

describe('\'faculties\' service', () => {
  it('registered the service', () => {
    const service = app.service('faculties');
    expect(service).toBeTruthy();
  });
});
