const express = require('express');
const supertest = require('supertest');

let _agent;

before(function () {
  if (_agent) {
    return _agent;
  }

  const app = express();
  require('../lib/middleware')(app);
  require('../lib/routes')(app);

  _agent = supertest(app);
});

module.exports = function () {
  return _agent;
};
