Application.controller('ListRepositoryController', [
  '$scope',
  '$window',
  'RepositoryService',
  function($scope, window, RepositoryService) {

    $scope.repositories = [];
    $scope.page = 1;

    RepositoryService
      .findAllRepositories($scope.page)
      .then(function(repositories) {
        $scope.repositories = repositories;
      });

    $scope.loadMore = function() {
      $scope.page = $scope.page + 1;
      RepositoryService
        .findAllRepositories($scope.page)
        .then(function(repositories) {
          $scope.repositories = _.union($scope.repositories, repositories);
        });
    };

  }]
);