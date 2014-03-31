Application.controller('ListTagController', [
  '$scope',
  'TagService',
  function($scope, TagService) {
    $scope.tags = [];

    TagService
      .findAllTags()
      .then(function(tags) {
        $scope.tags = tags;
      });
  }
]);