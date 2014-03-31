Application.service('RepositoryService', function($q, Restangular) {

  this.repositoryCache = {};

  this.findAllRepositories = function(page) {
    var promiseOnFindAllRepositories = $q.defer();
    var baseRepositories = Restangular.all('repository/starred');

    if (this.repositoryCache[page]) {
      promiseOnFindAllRepositories.resolve(this.repositoryCache[page]);
    }

    baseRepositories
      .getList({
        page: page
      })
      .then(
        _.bind(
          function(repositories) {
            this.repositoryCache[page] = _.union(this.repositories, repositories);
            promiseOnFindAllRepositories.resolve(this.repositoryCache[page]);
          },
          this
        ),
        function() {
          promiseOnFindAllRepositories.reject();
        }
      );

    return promiseOnFindAllRepositories.promise;
  };

  this.findRepository = function(repositoryId) {
    var repositories = _.values(this.repositoryCache)[0];
    return _.findWhere(repositories, {
      id: +repositoryId
    });
  }

});