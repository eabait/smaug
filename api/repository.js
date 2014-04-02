var github = require('octonode');
var mongoose = require('mongoose');
var UserSchema = require('../entities/user.schema');
var RepositorySchema = require('../entities/repository.schema');
var _ = require('lodash');

function processStarredRepositories(repositories, userName, cb) {
  var User = mongoose.model('User', UserSchema);
  var Repository = mongoose.model('Repository', RepositorySchema);
  User
    .findOne({userName: userName})
    .populate('repositories')
    .exec(function(err, user) {
      var res = _.map(repositories, function(repository) {
        var exists = _.find(user.repositories, function(repoWithTag) {
          return repoWithTag.name == repository.full_name;
        });
        return {
          id: repository.id,
          name: repository.name,
          full_name: repository.full_name,
          description: repository.description,
          owner: _.pick(repository.owner, 'avatar_url', 'name', 'html_url'),
          private: repository.private,
          html_url: repository.html_url,
          created_at: repository.created_at,
          updated_at: repository.updated_at,
          pushed_at: repository.pushed_at,
          size: repository.size,
          stargazers_count: repository.stargazers_count,
          watchers_count: repository.watchers_count,
          language: repository.language,
          forks_count: repository.forks_count,
          open_issues_count: repository.open_issues_count,
          watchers: repository.watchers,
          tags: exists ? exists.tags : []
        }
      });
      cb(res);
    });
}

module.exports.starred = function(req, res) {
  var token = req.session.token;
  var page = req.query.page ? req.query.page : 1;
  var gitHubClient = github.client(token).me();

  gitHubClient.starred(page, function(err, data, headers) {
    if (err) {
      res.json(500, err);
    } else {
      processStarredRepositories(data, req.session.userName, function(data) {
        res.json(200, data);
      });
    }
  });
};

module.exports.addTag = function(req, res) {
  var userName = req.session.userName;
  var repoName = req.params.id;
  var newTags = req.body.tags;

  var User = mongoose.model('User', UserSchema);
  var Repository = mongoose.model('Repository', RepositorySchema);

  User
    .findOne({
      userName: userName
    })
    .exec(function(err, user) {
      Repository
        .findOne({
          name: repoName,
          userName: userName
        })
        .exec(function(err, repository) {
          if (!err && repository) {
            repository.tags = _.union(repository.tags, newTags);
          } else {
            if (!err && !repository) {
              repository = new Repository({
                _creator: user._id,
                name: repoName,
                userName: userName,
                tags: newTags
              });
              user.repositories.push(repository);
              user.save();
            }
          }
          if (!err) {
            repository.save(function(err) {
              res.json(200, repository);
            });
          } else {
            res.json(500, err);
          }
        });
    });
};