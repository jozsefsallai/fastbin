const agent = require('../../tests/agent');
const { expect } = require('chai');

describe('homeController', function () {
  describe('GET /', function () {
    describe('when agent is not mobile', function () {
      it('should render Vue app', function () {
        return agent()
          .get('/')
          .timeout({
            response: 5000,
            deadline: 30000
          })
          .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64') // hack
          .expect(200)
          .then(res => expect(res.text).to.include('/dist/app.js'));
      });
    });

    describe('when agent is mobile', function () {
      it('should render static mobile page', function () {
        return agent()
          .get('/')
          .expect(200)
          .then(res => expect(res.text).to.include('/mobile/app.js'));
      });
    });
  });
});
