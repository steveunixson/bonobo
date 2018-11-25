const express = require('express');
const controller = require('../controllers/manager');

const router = express.Router();

/* GET home page. */
router.get('/manager/start', controller.renderLeads);
router.get('/manager/call', controller.renderCallManager);


module.exports = router;
