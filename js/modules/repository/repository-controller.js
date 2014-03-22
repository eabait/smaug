Application.controller('RepositoryController', function($scope, RepositoryService) {
  $scope.repositories = [];
  RepositoryService
    .findAllStarredByUser('eabait')
    .then(function(repositories) {
      $scope.repositories = repositories;
    });
});