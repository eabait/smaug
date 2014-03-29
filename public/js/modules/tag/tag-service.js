Application.factory('TagService', function(Restangular) {

  this.tags = [];

  function tagRepository(repositoryId, tags) {
    var repository = Restangular.one('repository', repositoryId).one('tag');
    repository.tags = tags;
    this.tags = _.union(this.tags, tags);
    return repository.put();
  }

  function listTag() {
    return this.tags;
  }

  return {
    listTag: listTag,
    tagRepository: tagRepository
  }

});