Application.directive('tagmanager', function() {

  function link(scope, element, attrs) {
    var tagInput = element.find('input[name="tag"]');
    $(tagInput).tagsManager();

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

    $(tagInput)
      .typeahead(
        {
          hint: true,
          highlight: true,
          minLength: 1,
          tagClass: 'ui label'
        },
        {
          name: 'tags',
          displayKey: 'name',
          source: tags.ttAdapter()
        }
      )
      .on('typeahead:selected', function (e, d) {
        $(tagInput).tagsManager('pushTag', d.name);
      });

    $(element)
      .find('.confirm')
      .on('click', function() {
        var tags = $('input[type="hidden"]').val();
        tags = tags.toLowerCase();
        scope.tagAction(tags.split(','));
      });

    $(element)
      .find('.add')
      .on('click', function() {
        var value = $(element).find('input[name="tag"]').val();
        $(tagInput).tagsManager('pushTag', value);
      });
  }

  return {
    restrict: 'A',

    link: link,

    scope: {
      tagSource: '=source',
      tagOutput: '=output',
      tagAction: '=tagaction'
    }
  };
});