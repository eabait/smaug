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

    $scope.unstar = function(fullname) {
      var repoName = fullname.split('/');
      RepositoryService
        .unStarRepository(repoName[0], repoName[1]);
    };

    $scope.removeTag = function(repository, tag) {
      //var repoName = fullname.split('/');
      RepositoryService
        .removeTagFromRepository(repository, tag);
    }

  }]
);