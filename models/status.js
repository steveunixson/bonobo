/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');
const config = require('../config/mongodb');
const log = require('../utils/log')(module);

mongoose.connect(config.database, { useNewUrlParser: true })
  .then(() => {
    log.info('CONNECTED TO DB');
  })
  .catch((exception) => {
    log.info(`EXCEPTION CAUGHT: FAILED TO CONNECT TO DB WITH EXCEPTION: ${exception}`);
  });

const Schema = mongoose.Schema;

const Status = new Schema({
  id: {
    type: Number,
  },
  base: {
    type: String,
  },
  success: {
    type: Boolean,
  },
  operator: {
    type: String,
  },
  type: {
    type: String,
  },
  project: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
  apiKey: {
    type: String,
  },
  localTime: {
    type: String,
  },
  comment: {
    type: String,
  },
});
const StatusModel = mongoose.model('Status', Status);
module.exports = StatusModel;
