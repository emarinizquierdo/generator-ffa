'use strict';

describe('Directive: <%= _.camelize(name) %>', function () {
  beforeEach(module('<%= _.camelize(appname) %>App'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<div <%= _.dasherize(name) %>></div>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the <%= _.camelize(name) %> directive');
  }));
});
