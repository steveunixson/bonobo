const express = require('express');

const upload = express.Router();
const config = require('../config/config');
const controller = require('../controllers/upload');

// Create database
upload.post(`${config.url}/upload`, controller.postUpload);
upload.get(`${config.url}/upload`, controller.getUpload);
upload.post(`${config.url}/numbers`, controller.getPhone);

module.exports = upload;
