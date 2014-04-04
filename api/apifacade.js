var AuthenticationController = require('./authentication/authentication');
var RepositoryController = require('./repository/repository');
var TagController = require('./tag/tag');

function ApiFacade(expressApplication) {
  expressApplication.get('/', AuthenticationController.index);
  expressApplication.get('/logout', AuthenticationController.logout);

  expressApplication.get('/repository/starred', RepositoryController.starred);
  expressApplication.delete('/repository/starred/:owner/:name', RepositoryController.unStarRepository);
  expressApplication.put('/repository/:owner/:name/tag', RepositoryController.addTag);
  expressApplication.delete('/repository/:owner/:name/:tag', RepositoryController.removeTag);

  expressApplication.get('/repository/tag/:id', TagController.findRepositoriesByTag);
  expressApplication.get('/tag', TagController.findAllTags);
}

module.exports = ApiFacade;