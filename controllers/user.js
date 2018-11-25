/* eslint-disable max-len */
const Status = require('../models/status');
const User = require('../models/users');

function renderStart(req, res) {
  const counter = async () => {
    const totalCalls = await Status.countDocuments({ operator: req.query.operator }, (err, count) => count);
    const totalLeads = await Status.countDocuments({ operator: req.query.operator, type: 'Лид' }, (err, count) => count);
    const goodMorningLeads = await Status.countDocuments({ operator: req.query.operator, type: 'Лид', project: 'Good Morning' }, (err, count) => count);
    const keyToCallLeads = await Status.countDocuments({ operator: req.query.operator, type: 'Лид', project: 'Key to Call' }, (err, count) => count);
    return {
      total: totalCalls,
      leads: totalLeads,
      goodMorning: goodMorningLeads,
      keyToCall: keyToCallLeads,
    };
  };
  counter()
    .then((result) => {
      res.status(200).render('user', {
        total: result.total, leads: result.leads, goodMorning: result.goodMorning, keyToCall: result.keyToCall,
      });
    })
    .catch((exception) => {
      res.status(500).json({ err: 1, exception });
    });
}

function renderCall(req, res) {
  const db = async () => {
    const result = await User.findOne({ username: req.query.operator }, (err, data) => data);
    return result;
  };
  db()
    .then((response) => {
      res.render('userCall', { yandex: response.yandexID, base: response.base });
    })
    .catch((exception) => {
      res.status(500).json({ err: 1, error: exception.toString() });
    });
}

module.exports.renderStart = renderStart;
module.exports.renderCall = renderCall;
