var Application = angular.module('app', ['restangular']);

Application.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://api.github.com');
});
