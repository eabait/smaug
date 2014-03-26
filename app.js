
var express = require('express'),
    bodyParser = require('body-parser'),
    github = require('octonode'),
    Config = require('./config.js'),
    exphbs  = require('express3-handlebars'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');

var app = express();

app.use(express.logger());
app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: '_1nd14n4j0n3s:1984_'}));
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var authUrl = github.auth
  .config({
    id: Config.GITHUB_CLIENT_ID,
    secret: Config.GITHUB_CLIENT_SECRET
  })
  .login(['user', 'repo', 'gist']);
 var state = authUrl.match(/&state=([0-9a-z]{32})/i);

app.get(
  '/',
  function(req, res) {
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
            res.redirect('/');
          });
        } else {
          res.render('login', {
            layout: false,
            oauthUrl: authUrl
          });
        }
      }
    }
  }
);

app.get(
  '/logout',
  function(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
);

app.get(
  '/starred',
  function(req, res) {
    var token = req.session.token;
    var gitHubClient = github.client(token).me();
    gitHubClient.starred(function(err, data, headers) {
      if (err) {
        res.json(401, err);
      } else{
        res.json(200, data);
      }
    });
  }
);

var serverPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var serverIpAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(serverPort, serverIpAddress, function () {
  console.log('Listening on ' + serverIpAddress + ', port ' + serverPort);
});
