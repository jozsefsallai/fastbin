const AWS = require('aws-sdk');
const config = require('../config');

class S3 {
  constructor() {
    const endpoint = new AWS.Endpoint(config.aws.s3.endpoint);

    this.s3 = new AWS.S3({
      endpoint,
      accessKeyId: config.aws.s3.key,
      secretAccessKey: config.aws.s3.secret
    });
  }

  exists(key) {
    const params = {
      Bucket: config.aws.s3.bucket,
      Key: key
    };

    return new Promise((resolve, reject) => {
      this.s3.headObject(params, err => {
        if (err) {
          if (err.code === 'NotFound') {
            return resolve(false);
          }

          return reject(err);
        }

        return resolve(true);
      });
    });
  }

  upload(key, contents) {
    const params = {
      ACL: 'public-read',
      Body: contents,
      Bucket: config.aws.s3.bucket,
      ContentType: 'text/plain',
      Key: key
    };

    return new Promise((resolve, reject) => {
      this.s3.putObject(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }

  getStream(key) {
    const params = {
      Bucket: config.aws.s3.bucket,
      Key: key
    };

    return this.s3.getObject(params).createReadStream();
  }

  read(key) {
    const params = {
      Bucket: config.aws.s3.bucket,
      Key: key
    };

    return new Promise((resolve, reject) => {
      return this.s3.getObject(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data.Body.toString());
      });
    });
  }
};

module.exports = S3;
