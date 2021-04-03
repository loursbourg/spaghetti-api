const application = require('../src/config/application');

describe('environment', () => {
  it('should use test db', () => {
    const dburl = application.database.url;
    expect(dburl).toContain('test');
  });
});
