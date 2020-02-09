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

module.exports.create = async function (req, res) {
  const contents = req.body;

  if (!contents || !contents.length) {
    return res.status(422).json({ ok: false, error: 'Contents is too short.' });
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
