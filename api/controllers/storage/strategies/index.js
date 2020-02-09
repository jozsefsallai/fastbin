const config = require('../../../config');

const FileStorageStrategy = require('./FileStorageStrategy');

module.exports = {
  FileStorageStrategy,

  getStorageStrategy() {
    const instance = module.exports[config.storageStrategy];
    return new instance();
  }
};
