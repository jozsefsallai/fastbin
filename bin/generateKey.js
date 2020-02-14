const uid = require('uid-safe');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, '..', `config.${env}.json`);

if (!fs.existsSync(configPath)) {
  throw new Error(`Config for env=${env} does not exist.`);
}

(async function () {
  const oldConfig = require('../api/config');

  oldConfig.auth.key = await uid(48);

  fs.writeFileSync(configPath, JSON.stringify(oldConfig, null, 2));
})().then(() => console.log('Done!'));
