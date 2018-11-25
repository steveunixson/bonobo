const Status = require('../models/status');
const User = require('../models/users');

function renderLeads(req, res) {
  const status = async () => {
    const result = await Status.find({ success: true, type: 'Лид' }, (err, data) => data);
    const user = await User.findOne({ username: req.query.username }, (err, data) => data);
    return { result, user };
  };
  status()
    .then((data) => {
      res.render(
        'manager',
        {
          statusData: data.result,
          yandexID: data.user.yandexID,
        },
      );
    })
    .catch((exception) => { res.status(500).json({ err: 1, msg: 'Internal Error', error: exception.toString() }); });
}

function renderCallManager(req, res) {
  console.log(req.query);
  res.status(200).render('managerCall', {
    company: req.query.company,
    number: req.query.number,
    yandexID: req.query.yandex,
    username: req.query.username,
  });
}

module.exports.renderCallManager = renderCallManager;
module.exports.renderLeads = renderLeads;
