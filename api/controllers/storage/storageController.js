const config = require('../../config');
const { getStorageStrategy } = require('./strategies');
const storage = getStorageStrategy();

const cuid = require('cuid');

module.exports.get = async function (req, res) {
  const { key } = req.params;

  if (!(await storage.exists(key))) {
    return res.status(404).json({ ok: false, error: 'File does not exist.' });
  }

  const contents = await storage.get(key);
  return res.json({
    ok: true,
    contents
  });
};

module.exports.raw = async function (req, res, next) {
  const { key } = req.params;

  if (!(await storage.exists(key))) {
    return res.status(404).json({ ok: false, error: 'File does not exist.' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  const stream = await storage.getStream(key);
  return stream.on('error', next).pipe(res);
};

module.exports.create = async function (req, res) {
  const contents = typeof req.body === 'string'
    ? req.body
    : req.body && Object.keys(req.body)[0];

  if (config.auth.key && config.auth.key !== req.token && !req.session.auth) {
    return res.status(400).json({ ok: false, error: 'Request unauthorized.' });
  }

  if (!contents || !contents.length) {
    return res.status(422).json({ ok: false, error: 'Contents is too short.' });
  }

  if (contents.length > config.limits.maxBodyLength) {
    return res.status(422).json({
      ok: false,
      error: `Your snippet needs to be less than ${config.limits.maxBodyLength} characters long.`
    });
  }

  try {
    let key = null;

    do {
      key = cuid.slug();
    } while (await storage.exists(key));

    await storage.create({ key, contents });

    return res.json({ ok: true, key });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
};
