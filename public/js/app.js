var Application = angular.module(
  'app',
  [
    'restangular',
    'ngRoute',
    'chieffancypants.loadingBar',
    'ngAnimate'
  ]
).run(function() {
  FastClick.attach(document.body);
  }
);

Application.config(function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
});

Application.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/repository', {
        templateUrl: 'js/modules/repository/list/list-repository-view-tpl.html',
        controller: 'ListRepositoryController'
      }).
      when('/repository/:id/tag/add', {
        templateUrl: 'js/modules/tag/add/add-tag-view-tpl.html',
        controller: 'AddTagController'
      }).
      when('/tag', {
        templateUrl: 'js/modules/tag/list/list-tag-view-tpl.html',
        controller: 'ListTagController'
      }).
      otherwise({
        redirectTo: '/repository'
      });
  }]
);

