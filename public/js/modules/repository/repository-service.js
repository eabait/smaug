Application.service('RepositoryService', function($q, Restangular) {

  this.page = 0;
  this.repositoryCache = [];

  this.findAllRepositories = function(page) {
    var promiseOnFindAllRepositories = $q.defer();
    var baseRepositories = Restangular.all('repository/starred');

    if (page <= this.page) {
      promiseOnFindAllRepositories.resolve(this.repositoryCache);
    } else {
      baseRepositories
        .getList({
          page: page
        })
        .then(
          _.bind(
            function(repositories) {
              this.repositoryCache = _.union(this.repositoryCache, repositories);
              this.page = page;
              promiseOnFindAllRepositories.resolve(this.repositoryCache);
            },
            this
          ),
          function() {
            promiseOnFindAllRepositories.reject();
          }
        );
    }
    return promiseOnFindAllRepositories.promise;
  };

  this.findRepository = function(repositoryId) {
    return _.findWhere(this.repositoryCache, {
      id: +repositoryId
    });
  };

  function requestRepositoriesByTag(tagId) {
    var repositoriesByTag = Restangular.all('repository/tag/' + tagId);
    return repositoriesByTag
      .getList()
      .then(function(repositories) {
        return repositories;
      });
  }

  this.findRepositoriesByTag = function(tagId) {
    var tagged;
    var promiseOnFindTaggedRepositories = $q.defer();

    if (this.repositoryCache.length > 0) {
      tagged = _.filter(this.repositoryCache, function(repository) {
        return _.indexOf(repository.tags, tagId) !== -1;
      });
      if (tagged.length > 0) {
        promiseOnFindTaggedRepositories.resolve(tagged);
      } else {
        requestRepositoriesByTag(tagId)
          .then(function(taggedRepositories) {
            promiseOnFindTaggedRepositories.resolve(taggedRepositories);
          });
      }
    } else {
      requestRepositoriesByTag(tagId)
        .then(function(taggedRepositories) {
          promiseOnFindTaggedRepositories.resolve(taggedRepositories);
        });
    }
    return promiseOnFindTaggedRepositories.promise;
  };

});