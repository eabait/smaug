Application.controller('ListRepositoryController', [
  '$scope',
  '$window',
  'RepositoryService',
  function($scope, window, RepositoryService) {

    $scope.page = 1;
    $scope.repositories = [];

    $scope.initialLoad = function() {
      RepositoryService
        .findAllRepositories($scope.page)
        .then(function(repositories) {
          $scope.repositories = repositories
        });
    };

    $scope.loadMore = function() {
      $scope.page = $scope.page + 1;
      RepositoryService
        .findAllRepositories($scope.page)
        .then(function(repositories) {
          $scope.repositories = _.union($scope.repositories, repositories);
        });
    };

    $scope.unstar = function(fullname) {
      var repoName = fullname.split('/');
      RepositoryService
        .unStarRepository(repoName[0], repoName[1]);
    };

  }]
);