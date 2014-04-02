Application.controller('AddTagController', [
  '$scope',
  '$routeParams',
  '$location',
  'RepositoryService',
  'TagService',
  function($scope, $routeParams, $locationProvider, RepositoryService, TagService) {
    $scope.repository = RepositoryService.findRepository($routeParams.id);
    $scope.srcTags = _.union($scope.repository.description.split(' '));

    $scope.addTagToRepository = function(addedTags) {
      $scope.repository.tags = _.union($scope.repository.tags, addedTags);
      TagService.tagRepository($scope.repository.full_name, addedTags);
      $locationProvider.path('#/repository');
    };
  }
]);