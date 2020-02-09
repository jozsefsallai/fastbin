const homeController = require('../controllers/homeController');
const storageController = require('../controllers/storage/storageController');

const bodyParser = require('body-parser');

module.exports = function (app) {
  app.get('/', homeController.index);

  app.get('/api/about', homeController.about);
  app.get('/documents/:key', storageController.get);
  app.post('/documents', bodyParser.text(), storageController.create);
  app.get('/raw/:key', storageController.raw);

  app.get('*', homeController.index);
};
