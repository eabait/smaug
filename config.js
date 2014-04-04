var Keys = require('./keys');

module.exports = {
  GITHUB_CLIENT_ID: process.env.OPENSHIFT_NODEJS_IP ? Keys.PROD.GITHUB_CLIENT_ID : Keys.DEV.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.OPENSHIFT_NODEJS_IP ? Keys.PROD.GITHUB_CLIENT_SECRET : Keys.DEV.GITHUB_CLIENT_SECRET,

  SERVER_PORT: process.env.OPENSHIFT_NODEJS_PORT || 3000,
  SERVER_IP_ADDRESS: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',

  MONGO_HOST: process.env.OPENSHIFT_MONGODB_DB_HOST ? process.env.OPENSHIFT_MONGODB_DB_HOST : 'localhost',
  MONGO_PORT: process.env.OPENSHIFT_MONGODB_DB_PORT ? process.env.OPENSHIFT_MONGODB_DB_PORT : '',
  MONGO_USERNAME: process.env.OPENSHIFT_MONGODB_DB_USERNAME ? process.env.OPENSHIFT_MONGODB_DB_USERNAME : '',
  MONGO_PASS: process.env.OPENSHIFT_MONGODB_DB_PASSWORD ? process.env.OPENSHIFT_MONGODB_DB_PASSWORD : ''
}