Application.service('RepositoryService', function(Restangular) {

  this.repositories = [];

  this.findAllRepositories = function(page) {
    var baseRepositories = Restangular.all('repository/starred');
    return baseRepositories
      .getList({
        page: page
      })
      .then(_.bind(function(repositories) {
        this.repositories = _.union(this.repositories, repositories);
        return repositories;
      }, this));
  };

  this.findRepository = function(repositoryId) {
    return _.findWhere(this.repositories, {
      id: +repositoryId
    });
  }

});