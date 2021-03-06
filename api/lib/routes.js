const config = require('../config');

const homeController = require('../controllers/home/homeController');
const sessionsController = require('../controllers/sessions/sessionsController');
const storageController = require('../controllers/storage/storageController');

const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

module.exports = function (app) {
  app.get('/', homeController.index);

  app.get('/login', sessionsController.login);
  app.post('/login', sessionsController.authenticate);
  app.get('/logout', sessionsController.destroy);

  app.get('/:key', homeController.snippet);
  app.get('/raw/:key', storageController.raw);

  app.get('/api/about', homeController.about);
  app.get('/documents/:key', storageController.get);

  app.post(
    '/documents',
    rateLimit({
      windowMs: config.limits.rateLimiting.window * 1000,
      max: config.limits.rateLimiting.maxRequests,
      message: { ok: false, error: 'Too many requests.' }
    }),
    bodyParser.text({
      limit: config.limits.maxPayloadSize
    }),
    storageController.create
  );

  app.get('*', homeController.index);
};
