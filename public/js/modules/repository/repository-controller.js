Application.controller('RepositoryController', ['$scope', 'RepositoryService', function($scope, RepositoryService) {
  $scope.repositories = [];
  RepositoryService
    .findAllStarredByUser()
    .then(function(repositories) {
      $scope.repositories = repositories;
    });
}]);