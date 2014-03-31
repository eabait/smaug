Application.factory('TagService', function(Restangular) {

  this.tags = [];

  function tagRepository(repositoryId, tags) {
    var repository = Restangular.one('repository', repositoryId).one('tag');
    repository.tags = tags;
    this.tags = _.union(this.tags, tags);
    return repository.put();
  }

  function findAllTags() {
    var baseTags = Restangular.all('tag');
    return baseTags
      .getList()
      .then(_.bind(function(tags) {
        this.tags = tags;
        return this.tags;
      }, this));
  }

  return {
    findAllTags: findAllTags,
    tagRepository: tagRepository
  }

});