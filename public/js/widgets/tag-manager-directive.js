Application.directive('tagmanager', function() {

  function link(scope, element, attrs) {
    $(element).tagsManager();

    var tags = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: scope.tagSource.map(function(tag) {
        return {
          name: tag
        };
      })
    });

    tags.initialize();

    $(element)
      .typeahead(
        {
          hint: true,
          highlight: true,
          minLength: 2
        },
        {
          name: 'tags',
          displayKey: 'name',
          source: tags.ttAdapter()
        }
      )
      .on('typeahead:selected', function (e, d) {
        $(element).tagsManager('pushTag', d.name);
        scope.tagOutput.push(d.name);
      });
  }

  return {
    restrict: 'C',

    link: link,

    scope: {
      tagSource: '=source',
      tagOutput: '=output'
    }
  }
});