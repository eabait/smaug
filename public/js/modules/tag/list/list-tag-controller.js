Application.controller('ListTagController', [
  '$scope',
  'TagService',
  'RepositoryService',
  function($scope, TagService, RepositoryService) {
    $scope.repositories = [];
    $scope.tags = [];
    $scope.loading = false;

    $scope.initialLoad = function() {
      $scope.loading = true;
      TagService
        .findAllTags()
        .then(function(tags) {
          $scope.loading = false;
          $scope.tags = tags;
        });
    };

    $scope.onTagClick = function(tag) {
      $scope.loading = true;
      RepositoryService
        .findRepositoriesByTag(tag)
        .then(function(repositories) {
          $scope.repositories = repositories;
          $scope.loading = false;
        });
    };
  }
]);