var mongoose = require('mongoose');

var RepositorySchema = mongoose.Schema({
  tags: [String],
  name: String,
  userName: String,
  _creator : { type: String, ref: 'User' }
});

module.exports = RepositorySchema;