
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

mongoose.connect('mongodb://' + Config.MONGO_USERNAME + ':' + Config.MONGO_PASS +
  '@' + Config.MONGO_HOST + ':' + Config.MONGO_PORT + '/smaug');
db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  app.use(express.session({
    key: 'smaug.id',
    secret: Keys.SESSION_SECRET,
    store: new MongoStore({
      mongoose_connection: db
    }),
    cookie: {
      httpOnly: false
    }
  }));

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  api = new ApiFacade(app);

  app.listen(Config.SERVER_PORT, Config.SERVER_IP_ADDRESS, function () {
    console.log('Listening on ' + Config.SERVER_IP_ADDRESS + ', port ' + Config.SERVER_PORT);
  });
});
