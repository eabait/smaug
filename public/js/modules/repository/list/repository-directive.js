Application.directive('repository', function() {
  return {
    restrict: 'E',
    replace: 'false',
    templateUrl: 'js/modules/repository/list/repository-tpl.html'
  };
});