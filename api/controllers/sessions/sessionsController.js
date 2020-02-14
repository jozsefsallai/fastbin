const config = require('../../config');

module.exports.authenticate = function (req, res) {
  if (!config.auth.key) {
    return res.json({ ok: true });
  }

  const { password } = req.body;

  if (password !== config.auth.key) {
    return res.status(400).json({ ok: false, error: 'Wrong password.' });
  }

  if (!req.session.auth) {
    req.session.auth = true;
  }

  return res.json({ ok: true });
};

module.exports.destroy = function (req, res) {
  if (!config.auth.key || !req.session.auth) {
    return res.redirect('/');
  }

  req.session.auth = false;

  return res.redirect('/login');
};

module.exports.login = function (req, res) {
  if (!config.auth.key || req.session.auth) {
    return res.redirect('/');
  }

  return res.render('auth');
};
