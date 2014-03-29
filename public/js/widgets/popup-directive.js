Application.directive('popup', function() {

  function link(scope, element, attrs) {

    element.on('$destroy', function() {
      this.remove();
    });

    $(element).popup({
      debug: false
    });
  }

  return {
    restrict: 'A',
    link: link
  }
});