Application.service('RepositoryService', function($q, Restangular) {

  var PAGE_SIZE = 30;
  this.page = 0;
  this.repositoryCache = [];

  function repositoryComparator(repo1, repo2) {
    return repo1.full_name === repo2.full_name;
  }

  function belongsTo(element, collection, comparator) {
    var result = _.filter(collection, function(collectionElement) {
      return (comparator(element, collectionElement));
    });
    return result.length;
  }

  function getUnion(collection1, collection2) {
    if (!collection1.length) {
      return collection2;
    }
    var addToCollection1 = _.filter(collection2, function(element) {
      return !belongsTo(element, collection1, repositoryComparator);
    });
    return collection1.concat(addToCollection1);
  }

  this.findAllRepositories = function(page) {
    var promiseOnFindAllRepositories = $q.defer();
    var baseRepositories = Restangular.all('repository/starred');

    if (page <= this.page && this.repositoryCache.length === PAGE_SIZE) {
      promiseOnFindAllRepositories.resolve(this.repositoryCache);
    } else {
      baseRepositories
        .getList({
          page: page
        })
        .then(
          _.bind(
            function(repositories) {
              this.repositoryCache = getUnion(this.repositoryCache, repositories);
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

  function requestRepositoriesByTag(tagId, context) {
    var repositoriesByTag = Restangular.all('repository/tag/' + tagId);
    return repositoriesByTag
      .getList()
      .then(function(repositories) {
        context.repositoryCache = getUnion(context.repositoryCache, repositories);
        return repositories;
      });
  }

  this.findRepositoriesByTag = function(tagId, count) {
    var tagged;
    var promiseOnFindTaggedRepositories = $q.defer();

    if (this.repositoryCache.length > 0) {
      tagged = _.filter(this.repositoryCache, function(repository) {
        return _.indexOf(repository.tags, tagId) !== -1;
      });
      if (tagged.length === count) {
        promiseOnFindTaggedRepositories.resolve(tagged);
      } else {
        requestRepositoriesByTag(tagId, this)
          .then(function(taggedRepositories) {
            promiseOnFindTaggedRepositories.resolve(taggedRepositories);
          });
      }
    } else {
      requestRepositoriesByTag(tagId, this)
        .then(function(taggedRepositories) {
          promiseOnFindTaggedRepositories.resolve(taggedRepositories);
        });
    }
    return promiseOnFindTaggedRepositories.promise;
  };

  this.unStarRepository = function(repository) {
    var repoFullName = repository.full_name.split('/');
    var owner = repoFullName[0];
    var name = repoFullName[1];
    var baseRepositories = Restangular.one('repository/starred');
    return baseRepositories
      .one(owner)
      .one(name)
      .remove()
      .then(_.bind(function() {
        var removeIndex = -1;
        var toRemove = _.each(this.repositoryCache, function(repository, index) {
          if (repository.full_name === owner + '/' + name) {
            removeIndex = index;
          }
        });
        this.repositoryCache.splice(removeIndex, 1);
        return removeIndex;
      }, this));
  };

  this.removeTagFromRepository = function(repository, tag) {
    var repoName = repository.full_name.split('/');
    var baseRepository = Restangular.one('repository');
    return baseRepository
      .one(repoName[0])
      .one(repoName[1])
      .one(tag)
      .remove()
      .then(_.bind(function(updatedRepository) {
        repository.tags = updatedRepository.tags;
        return repository;
      }, this))
  }

});