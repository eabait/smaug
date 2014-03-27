Application.factory('RepositoryService', function(Restangular) {

  function findAllStarredRepositories(page) {
    var baseAccounts = Restangular.all('repository/starred');
    return baseAccounts
      .getList({
        page: page
      })
      .then(function(repositories) {
        return repositories;
      });
  }

  function addTag(repositoryId, tags) {
    var repository = Restangular.one('repository', repositoryId).one('tag');
    repository.tags = tags;
    return repository.put();
  }

  return {
    findAllStarredRepositories: findAllStarredRepositories,
    addTag: addTag
  }

});