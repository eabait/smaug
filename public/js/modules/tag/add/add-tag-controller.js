Application.controller('AddTagController', [
  '$scope',
  '$routeParams',
  '$location',
  'RepositoryService',
  'TagService',
  function($scope, $routeParams, $locationProvider, RepositoryService, TagService) {
    $scope.repository = RepositoryService.findRepository($routeParams.id);
    $scope.srcTags = _.union($scope.repository.description.split(' '));
    $scope.addedTags = [];

    $scope.tagRepository = function() {
      $scope.repository.tags = _.union($scope.repository.tags, $scope.addedTags);
      TagService.tagRepository($scope.repository.id, $scope.addedTags);
      $locationProvider.path('#/repository');
    };
  }
]);