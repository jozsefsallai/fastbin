const config = require('../config');
const session = require('express-session');

let SessionStoreClass = null;
let options = {};

switch (config.session.driver) {
  case 'file':
    SessionStoreClass = require('session-file-store')(session);
    break;
  /* istanbul ignore next */
  case 'redis':
    SessionStoreClass = require('connect-redis')(session);
    options = {
      host: config.redis.host,
      port: config.redis.port
    };
    break;
}

module.exports = new SessionStoreClass(options);
