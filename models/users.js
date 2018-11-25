/* eslint-disable prefer-destructuring */
require('dotenv').config();

const mongoose = require('mongoose');

const config = require('../config/mongodb');
const log = require('../utils/log')(module);

mongoose.connect(config.database, { bufferCommands: false, useNewUrlParser: true })
  .then(() => {
    mongoose.set('debug', true);
    log.info('CONNECTED TO DB');
  })
  .catch((exception) => {
    log.info(`EXCEPTION CAUGHT: FAILED TO CONNECT TO DB WITH EXCEPTION: ${exception}`);
  });
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  yandexID: {
    type: Number,
    required: true,
  },
  base: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
  },
});
// Export the Mongoose model

module.exports = mongoose.model('User', UserSchema);
