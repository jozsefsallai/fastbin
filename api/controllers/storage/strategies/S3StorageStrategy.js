const S3 = require('../../../lib/S3');

class S3StorageStrategy {
  async create(params) {
    await new S3().upload(params.key, params.contents);
  }

  async get(key) {
    return new S3().read(key);
  }

  async getStream(key) {
    return new S3().getStream(key);
  }

  async exists(key) {
    return new S3().exists(key);
  }
}

module.exports = S3StorageStrategy;
