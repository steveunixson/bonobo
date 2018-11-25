/* eslint-disable max-len */
require('dotenv').config();
const nodemailer = require('nodemailer');
const Status = require('../models/status');
const Time = require('../models/time');
const log = require('../utils/log')(module);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: 'commonbonobo@gmail.com',
    pass: process.env.SENDMAILPASS,
  },
});

function postStatus(req, res) {
  const systemDate = new Date().toLocaleTimeString();
  const status = new Status({
    id: req.body.id,
    base: req.body.base,
    success: req.body.success,
    operator: req.body.operator,
    type: req.body.type,
    project: req.body.project,
    status: req.body.status,
    date: req.body.date,
    time: req.body.time,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    comment: req.body.comment,
    localTime: systemDate,
  });
  status.save((err, stats) => {
    if (!err) {
      log.debug('status added to collection');
      return res.status(200).json({ err: 0, status: stats });
    }

    log.error(err);
    return res.json({ message: 'Internal Error' });
  });
}

function postTime(req, res) {
  const Save = async () => {
    const time = new Time(req.body);
    await time.save((err, result) => result);
  };
  Save()
    .then(() => {
      res.status(200).json({ err: 0, msg: 'saved' });
      const mailOptions = {
        from: 'commonbonobo@gmail.com',
        to: process.env.EMAIL,
        subject: `Отчет о действиях оператора ${req.body.operator}`,
        text: `\nНачал звонить в: ${req.body.start}\n 
        Закончил звонить в: ${req.body.end}\n 
        Позвонил ${req.body.callNumber} раз\n
        Дата: ${req.body.localDate}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          log.error(error);
        } else {
          log.info(`Email sent: ${info.response}`);
          transporter.close();
        }
      });
    })
    .catch((exception) => { res.status(500).json({ err: 1, msg: exception }); });
}

module.exports.postStatus = postStatus;
module.exports.postTime = postTime;
