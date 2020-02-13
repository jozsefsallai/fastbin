const firebase = require('firebase-admin');
const config = require('../config');

class Firebase {
  constructor() {
    const serviceAccount = require('../../firebase');

    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount)
    });
    this.storage = firebase.storage().bucket(`${config.firebase.bucket}.appspot.com`);
  }

  exists(key) {
    return new Promise((resolve, reject) => {
      this.storage.file(key).exists()
        .then(res => resolve(res[0]))
        .catch(reject);
    });
  }

  upload(key, contents) {
    const file = this.storage.file(key);
    return new Promise((resolve, reject) => {
      file.save(contents, err => {
        if (err) {
          return reject(err);
        }

        return resolve(true);
      });
    });
  }

  getStream(key) {
    const file = this.storage.file(key);
    return file.createReadStream();
  }

  read(key) {
    const file = this.storage.file(key);
    return new Promise((resolve, reject) => {
      file.download()
        .then(contents => resolve(contents.toString()))
        .catch(reject);
    });
  }
}

module.exports = Firebase;
