Application.directive('popup', function() {

  function link(scope, element, attrs) {

    element.on('$destroy', function() {
      $(this)
        .popup('remove');
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