Application.controller('ListTagController', [
  '$scope',
  'TagService',
  function($scope, TagService) {
    $scope.tags = [
      { _id: 'd3', count: 1 },
      { _id: 'sdk', count: 2 },
      { _id: 'github', count: 2 },
      { _id: 'irc', count: 1 },
      { _id: 'angular', count: 1 },
      { _id: 'visualization', count: 2 },
      { _id: 'best practices', count: 1 },
      { _id: 'mvc', count: 2 },
      { _id: 'rest', count: 4 },
      { _id: 'error handling', count: 1 },
      { _id: 'nodejs', count: 1 },
      { _id: 'charting', count: 1 }
    ]
  }
]);