const User = require('../models/users');
const Match = require('../models/phonebase');
const Status = require('../models/status');

function renderIndex(req, res) {
  res.status(200).render('admin');
}

function renderBaseUpload(req, res) {
  res.status(200).render('upload');
}

function renderSignUP(req, res) {
  res.status(200).render('signup');
}

function renderRemove(req, res) {
  res.status(200).render('remove');
}

function uniq(a) {
  return Array.from(new Set(a));
}

function renderStats(req, res) {
  const stats = async () => {
    const operators = [];
    const leads = await Status.find({ type: 'Лид', success: true }, (err, data) => data);
    await leads.forEach((result) => { operators.push(result.operator); });
    const countLeads = await Status.countDocuments({ operator: uniq(operators) });
    console.log(countLeads);
    return { leads, operators };
  };
  stats()
    .then((result) => { res.status(200).render('statistics'); console.log(result.operators); })
    .catch((exception) => { res.status(500).json({ err: 1, msg: 'Internal Error', debug: exception.toString() }); });
}
//  res.status(200).render('statistics');
// res.status(500).json({ err: 1, msg: 'Internal Error', debug: exception.toString() });
function renderBaseOP(req, res) {
  const base = async () => {
    const result = await Match.find({}, (err, data) => data);
    return result;
  };
  base()
    .then((result) => {
      res.status(200).render('base', { uploaded: result });
    })
    .catch((exception) => {
      res.status(500).render('message', { message: exception });
    });
}

function updateUserBase(req, res) {
  const user = req.body.username;
  const database = req.body.base;
  const update = async () => {
    await User.findOneAndUpdate({
      username: user,
    }, {
      $set: { base: database },
    }, (err, document) => document);
  };
  update()
    .then(() => {
      res.status(200).json({ err: 0, msg: 'Updated' });
    })
    .catch((exception) => {
      res.status(500).json({ err: 1, msg: exception });
    });
}

module.exports.renderIndex = renderIndex;
module.exports.updateUserBase = updateUserBase;
module.exports.renderBaseOP = renderBaseOP;
module.exports.renderBaseUpload = renderBaseUpload;
module.exports.renderSignUP = renderSignUP;
module.exports.renderRemove = renderRemove;
module.exports.renderStats = renderStats;
