const homeController = require('../controllers/homeController');

module.exports = function (app) {
  app.get('/', homeController.index);

  app.get('/api/about', homeController.about);

  app.get('*', homeController.index);
};
