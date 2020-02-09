const log = require('./logger');
const config = require('../config');

module.exports = function (app) {
  return app.listen(config.port, function () {
    log(`App started on port ${config.port}.`);
  });
};
