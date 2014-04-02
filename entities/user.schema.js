var mongoose = require('mongoose'),
  RepositorySchema = require('./repository.schema');

var UserSchema = mongoose.Schema({
  id: String,
  userName: String,
  userAvatar: String,
  repositories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repository' }]
});

module.exports = UserSchema;