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
      var repoName = $scope.repository.full_name.split('/');
      addedTags = _.filter(addedTags, function(tag) {
        return !!tag;
      });
      if (addedTags.length > 0) {
        $scope.repository.tags = _.union($scope.repository.tags, addedTags);
        TagService.tagRepository(repoName[0], repoName[1], addedTags);
        $locationProvider.path('#/repository');
      }
    };
  }
]);