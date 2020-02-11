const fs = require('fs-extra');
const path = require('path');
const config = require('../../../config');

const STORAGE_ROOT = path.join(__dirname, '../../../../', config.fileStorage.location);

class FileStorageStrategy {
  async create(params) {
    const { key, contents } = params;
    const filePath = path.join(STORAGE_ROOT, key);
    await fs.writeFile(filePath, contents, { encoding: 'utf8' });
  }

  async get(key) {
    return fs.readFile(path.join(STORAGE_ROOT, key), { encoding: 'utf8' });
  }

  async getStream(key) {
    const filePath = path.join(STORAGE_ROOT, key);
    return fs.createReadStream(filePath);
  }

  async exists(key) {
    return fs.exists(path.join(STORAGE_ROOT, key));
  }
}

module.exports = FileStorageStrategy;
