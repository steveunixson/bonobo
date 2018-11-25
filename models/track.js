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

const Track = new Schema({
  apiKey: String,
  time: Number,
  operator: String,
  localTime: String,
  localDate: String,
}, {
  timestamps: true,
});

const TrackModel = mongoose.model('Track', Track);

module.exports = TrackModel;
