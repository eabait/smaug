var mongoose = require('mongoose');
var RepositorySchema = require('../../entities/repository.schema');
var _ = require('lodash');
var github = require('octonode');
var Q = require('q');

module.exports.findAllTags = function(req, res) {
  var userName = req.session.userName;
  var Repository = mongoose.model('Repository', RepositorySchema);

  Repository
    .aggregate({
      $match: {
        userName: userName
      }
    })
    .unwind('tags')
    .project('tags')
    .group({
      _id: '$tags',
      count: {
        $sum: 1
      }
    })
    .sort({
      count: 'desc'
    })
    .exec(function(err, result) {
      res.json(200, result);
    });

};

function getRepositoryInfo(gitHubClient, repository) {
  var deferred = Q.defer();
  var ghRepo = gitHubClient.repo(repository.name);
  var tags = repository.tags;
  var repository = {};
  ghRepo.info(function(err, ghRepo, headers) {
    if (err) {
      deferred.reject(err);
    } else {
      repository.name = ghRepo.name;
      repository.full_name = ghRepo.full_name;
      repository.description = ghRepo.description;
      repository.owner = _.pick(ghRepo.owner, 'avatar_url', 'name', 'html_url');
      repository.private = ghRepo.private;
      repository.html_url = ghRepo.html_url;
      repository.created_at = ghRepo.created_at;
      repository.updated_at = ghRepo.updated_at;
      repository.pushed_at = ghRepo.pushed_at;
      repository.size = ghRepo.size;
      repository.stargazers_count = ghRepo.stargazers_count;
      repository.watchers_count = ghRepo.watchers_count;
      repository.language = ghRepo.language;
      repository.forks_count = ghRepo.forks_count;
      repository.open_issues_count = ghRepo.open_issues_count;
      repository.watchers = ghRepo.watchers;
      repository.tags = tags;
      deferred.resolve(repository);
    }
  });
  return deferred.promise;
}

module.exports.findRepositoriesByTag = function(req, res) {
  var userName = req.session.userName;
  var tags = req.params.id;
  var token = req.session.token;
  var gitHubClient = github.client(token);
  var Repository = mongoose.model('Repository', RepositorySchema);

  Repository
    .find({
      userName: userName,
      tags: {
        $in: [tags]
      }
    })
    .exec(function(err, result) {
      var ghRequestPromiseArray = _.map(result, function(repository) {
        return getRepositoryInfo(gitHubClient, repository);
      });
      Q
        .all(ghRequestPromiseArray)
        .then(function(repositories) {
          res.json(200, repositories);
        });
    });

};
