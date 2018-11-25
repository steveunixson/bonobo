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
// Define our beer schema
const MatchSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  type: String,
  comment: String,
  apikey: String,
});

// Export the Mongoose model

module.exports = mongoose.model('Match', MatchSchema);
