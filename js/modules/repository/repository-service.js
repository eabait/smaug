Application.factory('RepositoryService', function(Restangular) {

  function findAllStarredByUser(user) {
    var baseAccounts = Restangular.all('users/' + user + '/starred');
    return baseAccounts
      .getList()
      .then(function(repositories) {
        return _.map(repositories, function(repository) {
          return {
            id: repository.id,
            name: repository.name,
            repositoryUrl: repository.html_url,
            avatarUrl: repository.owner.avatar_url
          };
        });
      });
  }

  return {
    findAllStarredByUser: findAllStarredByUser
  }

});