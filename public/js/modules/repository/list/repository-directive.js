Application.directive('repository', [

  'RepositoryService',

  function(RepositoryService) {
    return {

      restrict: 'E',

      replace: 'false',

      templateUrl: 'js/modules/repository/list/repository-tpl.html',

      controller: function($scope) {
        $scope.unstar = function(repository) {
          RepositoryService
            .unStarRepository(repository);
        };

        $scope.removeTag = function(repository, tag) {
          RepositoryService
            .removeTagFromRepository(repository, tag);
        };
      }
    };
  }]
);