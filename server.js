
var express = require('express'),
    bodyParser = require('body-parser'),
    exphbs  = require('express3-handlebars'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    Config = require('./config'),
    Keys = require('./keys'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(express),
    ApiFacade = require('./api/apifacade'),
    app = express(),
    db,
    serverPort,
    serverIpAddress,
    api;

app.use(express.logger());
app.use(bodyParser());
app.use(cookieParser());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Error-handling middleware
app.use(function(err, req, res, next) {
  res.status(err.status);
  res.json(err.data);
});

mongoose.connect('mongodb://' + Config.MONGO_USERNAME + ':' + Config.MONGO_PASS +
  '@' + Config.MONGO_HOST + ':' + Config.MONGO_PORT + '/smaug');
db = mongoose.connection;

db.on('error', function(err) {
  console.log('Failed to connect to mongodb during application bootstrapping.');
  console.log(err);
});

db.once('open', function() {
  app.use(express.session({
    key: 'smaug.id',
    secret: Keys.SESSION_SECRET,
    store: new MongoStore({
      mongoose_connection: db
    })
  }));

  app.use(express.csrf());

  app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  api = new ApiFacade(app);

  app.listen(Config.SERVER_PORT, Config.SERVER_IP_ADDRESS, function () {
    console.log('Listening on ' + Config.SERVER_IP_ADDRESS + ', port ' + Config.SERVER_PORT);
  });
});
