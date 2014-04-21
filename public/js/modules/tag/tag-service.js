Application.service('TagService', function(Restangular) {

  this.tags = [];

  function Tag(name, count) {
    this._id = name;
    this.count = count;
  }

  function findTag(id) {
    return _.find(this.tags, function(tag) {
      return tag._id === id;
    });
  }

  function updateOrCreateTag(tagId) {
    var tag = findTag.call(this, tagId);

    if (tag) {
      tag.count = tag.count + 1;
    } else {
      this.tags.push(new Tag(tagId, 1));
    }
  }

  function addAllTags(tags) {
    _.map(tags, _.bind(function(tag) {
        updateOrCreateTag.call(this, tag);
    }, this));
  }

  this.getTagList = function() {
    return _.pluck(this.tags, '_id');
  };

  this.tagRepository = function(repoOwner, repoName, tags) {
    var repository = Restangular
      .one('repository')
      .one(repoOwner)
      .one(repoName)
      .one('tag');
    repository.tags = tags;
    addAllTags.call(this, tags);
    return repository.put();
  };

  this.findAllTags = function() {
    var baseTags = Restangular.all('tag');
    return baseTags
      .getList()
      .then(_.bind(function(tags) {
        this.tags = tags;
        return this.tags;
      }, this));
  };

});