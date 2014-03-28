var mongoose = require('mongoose');
var RepositorySchema = require('../entities/repository.schema');

module.exports.tagList = function(req, res) {
  var ghUserId = req.session.ghUserId;
  var Repository = mongoose.model('Repository', RepositorySchema);

  Repository
    .aggregate({
      $match: {
        ghUserId: '' + ghUserId
      }
    })
    .unwind('tags')
    .project('tags')
    .group({
      _id: '$tags',
      count: {
        $sum: 1
      }
    })
    .exec(function(err, result) {
      res.json(200, result);
    });

};