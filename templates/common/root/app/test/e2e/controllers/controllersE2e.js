//
// test/e2e/controllers/controllersE2e.js
//
describe("E2E: Testing Controllers", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should navigate to #/', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe("/");
  });

});