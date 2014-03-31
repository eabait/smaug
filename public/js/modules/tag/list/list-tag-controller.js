Application.controller('ListTagController', [
  '$scope',
  'TagService',
  function($scope, TagService) {
    TagService
      .findAllTags()
      .then(function(tags) {
        $scope.tags = tags;
      });
  }
]);