const express = require('express');

const router = express.Router();
const controller = require('../controllers/user');
const auth = require('../controllers/auth');

/* GET home page. */
router.get('/operator/start', auth.TokenMiddleware, controller.renderStart);
router.get('/operator/call', controller.renderCall);

module.exports = router;
