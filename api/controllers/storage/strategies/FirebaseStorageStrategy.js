const Firebase = require('../../../lib/Firebase');

class FirebaseStorageStrategy {
  async create(params) {
    await new Firebase().upload(params.key, params.contents);
  }

  async get(key) {
    return new Firebase().read(key);
  }

  async getStream(key) {
    return new Firebase().getStream(key);
  }

  async exists(key) {
    return new Firebase().exists(key);
  }
}

module.exports = FirebaseStorageStrategy;
