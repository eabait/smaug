var mongoose = require('mongoose');

var RepositorySchema = mongoose.Schema({
  id: String,
  tags: [String],
  ghUserId: String,
  _creator : { type: String, ref: 'User' }
});

module.exports = RepositorySchema;