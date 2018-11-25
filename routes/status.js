const express = require('express');
const config = require('../config/config');
const controller = require('../controllers/status');

const router = express.Router();
/* GET home page. */
router.post(`${config.url}/status`, controller.postStatus);
router.post(`${config.url}/user/stats`, controller.postTime);

module.exports = router;
