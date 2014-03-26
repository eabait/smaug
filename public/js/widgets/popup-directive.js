Application.directive('popup', function() {

  function link(scope, element, attrs) {
    $(element).popup({
      debug: false
    });
  }

  return {
    restrict: 'A',
    link: link
  }
});