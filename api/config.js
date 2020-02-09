const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, '..', `config.${env}.json`);

if (!fs.existsSync(configPath)) {
  throw new Error(`Config file not found for NODE_ENV=${env}. Please create a file called config.${env}.json.`);
}

module.exports = require(configPath);
