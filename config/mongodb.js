require('dotenv').config();

module.exports = {
  uri: process.env.MONGO,
  name: process.env.NAME,
  database: process.env.MONGODB_URI,
  secret: process.env.SRV_SECRET,
  autoIndex: false,
  useNewUrlParser: true,
};
