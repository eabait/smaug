Application.controller('RepositoryController', [
  '$scope',
  '$window',
  'RepositoryService',
  function($scope, window, RepositoryService) {
    $scope.repositories = [];
    $scope.page = 1;
    RepositoryService
      .findAllStarredRepositories($scope.page)
      .then(function(repositories) {
        $scope.repositories = repositories;
      });

    $scope.loadMore = function() {
      $scope.page = $scope.page + 1;
      RepositoryService
        .findAllStarredRepositories($scope.page)
        .then(function(repositories) {
          $scope.repositories = _.union($scope.repositories, repositories);
        });
    }

    $scope.addTag = function(repository) {
      var tag = window.prompt('Please input a tag');
      if (tag) {
        repository.tags.push(tag);
        RepositoryService
          .addTag(repository.id, [tag])
          .then(function(repository) {
            console.log(repository);
          }
        );
      }
    },

    $scope.alert = function(tag) {
      console.log(JSON.stringify(tag));
    }
  }]
);