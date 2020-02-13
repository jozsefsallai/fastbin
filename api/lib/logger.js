const winston = require('winston');
const fs = require('fs');
const path = require('path');
const config = require('../config');

function getLogger() {
  if (!config.logging) {
    return null;
  }

  if (config.logging === 'console') {
    return winston.createLogger({
      transports: [new winston.transports.Console()]
    });
  }

  if (!fs.existsSync(path.join(config.logging))) {
    throw new Error('Invalid logging path.');
  }

  return winston.createLogger({
    transports: [new winston.transports.File({ filename: config.logging })]
  });
}

const logger = getLogger();

function log(opts) {
  let options = {};

  if (typeof opts === 'string') {
    options.message = opts;
  } else {
    if (opts.message) {
      return;
    }

    options = opts;
  }

  if (!logger) {
    return;
  }

  logger.log({
    level: options.level || 'info',
    message: options.message
  });
};

module.exports = log;
