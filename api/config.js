const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const defaultConfig = require('../config.development');

function deepassign(dest, src) {
  Object.keys(src).forEach(key => {
    if (typeof dest[key] === 'object' && dest[key] !== null) {
      return deepassign(dest[key], src[key]);
    }

    dest[key] = src[key];
  });
}

if (env !== 'development') {
  const configPath = path.join(__dirname, '..', `config.${env}.json`);

  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found for NODE_ENV=${env}. Please create a file called config.${env}.json.`);
  }

  const envConfig = require(configPath);
  deepassign(defaultConfig, envConfig);
}

module.exports = defaultConfig;
