const fs = require('fs-extra');
const path = require('path');

const STORAGE_ROOT = path.join(__dirname, '../../../../', 'storage')

class FileStorageStrategy {
  async create(params) {
    const { key, contents } = params;
    const filePath = path.join(STORAGE_ROOT, key);
    await fs.writeFile(filePath, contents, { encoding: 'utf8' });
  }

  async get(key) {
    return await fs.readFile(path.join(STORAGE_ROOT, key), { encoding: 'utf8' });
  }

  async exists(key) {
    return await fs.exists(path.join(STORAGE_ROOT, key));
  }
}

module.exports = FileStorageStrategy;
