const config = require('../../../config');

const FileStorageStrategy = require('./FileStorageStrategy');
const S3StorageStrategy = require('./S3StorageStrategy');
const FirebaseStorageStrategy = require('./FirebaseStorageStrategy');

module.exports = {
  FileStorageStrategy,
  S3StorageStrategy,
  FirebaseStorageStrategy,

  getStorageStrategy() {
    const instance = module.exports[config.storageStrategy];
    return new instance(); // eslint-disable-line new-cap
  }
};
