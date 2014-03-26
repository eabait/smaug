var Application = angular.module('app', ['restangular', 'ngRoute']);

Application.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://127.0.0.1:3000');//'http://smaug-eabait.rhcloud.com'
});

Application.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/repository', {
        templateUrl: 'js/modules/repository/repositories-view-tpl.html',
        controller: 'RepositoryController'
      }).
      otherwise({
        redirectTo: '/repository'
      });
  }]);
