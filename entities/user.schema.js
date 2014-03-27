var mongoose = require('mongoose'),
  RepositorySchema = require('./repository.schema');

var UserSchema = mongoose.Schema({
  id: String,
  repositories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repository' }]
});

module.exports = UserSchema;