var github = require('octonode');
var Config = require('../config');
var mongoose = require('mongoose');
var UserSchema = require('../entities/user.schema');

var authUrl = github.auth
  .config({
    id: Config.GITHUB_CLIENT_ID,
    secret: Config.GITHUB_CLIENT_SECRET
  })
  .login(['user', 'repo', 'gist']);
var state = authUrl.match(/&state=([0-9a-z]{32})/i);

module.exports.index = function(req, res) {
  if (req.session.token) {
    res.render('index', {
      layout: false
    });
  } else {
    if (req.query.state && (!state || state[1] != req.query.state)) {
      res.json(403);
    } else {
      if (req.query.code) {
        github.auth.login(req.query.code, function (err, token) {
          req.session.token = token;
          github.client(token).me().info(function(err, data, headers) {
            req.session.ghUserId = data.id;
            req.session.save(function(err) {
              res.redirect('/');
            });

            var User = mongoose.model('User', UserSchema);
            newUser = new User({
              id: data.id
            });
            newUser.save();
          });
        });
      } else {
        res.render('login', {
          layout: false,
          oauthUrl: authUrl
        });
      }
    }
  }
};

module.exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
};