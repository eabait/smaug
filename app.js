
var express = require('express'),
    bodyParser = require('body-parser'),
    exphbs  = require('express3-handlebars'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    Config = require('./config'),
    authenticationApi = require('./api/authentication'),
    repositoryApi = require('./api/repository'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(express),
    tagApi = require('./api/tag');

var app = express(),
    db,
    serverPort,
    serverIpAddress;

app.use(express.logger());
app.use(bodyParser());
app.use(cookieParser());

mongoose.connect('mongodb://' + Config.MONGO_USERNAME + ':' + Config.MONGO_PASS +
  '@' + Config.MONGO_HOST + ':' + Config.MONGO_PORT + '/smaug');

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.use(express.session({
    secret: '_1nd14n4j0n3s:1984_',
    store: new MongoStore({
      mongoose_connection: db
    })
  }));

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  app.get('/', authenticationApi.index);
  app.get('/logout', authenticationApi.logout);
  app.get('/repository/starred', repositoryApi.starred);
  app.put('/repository/:id/tag', repositoryApi.addTag);
  app.get('/tag', tagApi.tagList);

  serverPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;
  serverIpAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

  app.listen(serverPort, serverIpAddress, function () {
    console.log('Listening on ' + serverIpAddress + ', port ' + serverPort);
  });
});

