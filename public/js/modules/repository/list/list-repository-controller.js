Application.controller('ListRepositoryController', [
  '$scope',
  '$window',
  'RepositoryService',
  function($scope, window, RepositoryService) {

    $scope.loading = false;
    $scope.page = 1;
    $scope.repositories = [];

    $scope.initialLoad = function() {
      $scope.loading = true;
      RepositoryService
        .findAllRepositories($scope.page)
        .then(function(repositories) {
          $scope.loading = false;
          $scope.repositories = repositories
        });
    };

    $scope.loadMore = function() {
      $scope.page = $scope.page + 1;
      $scope.loading = true;
      RepositoryService
        .findAllRepositories($scope.page)
        .then(function(repositories) {
          $scope.loading = false;
          $scope.repositories = _.union($scope.repositories, repositories);
        });
    };

  }]
);