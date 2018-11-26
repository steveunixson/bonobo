const express = require('express');

const router = express.Router();
const config = require('../config/config');
const auth = require('../controllers/auth');
/* GET home page. */
router.post('/api/v3/login', auth.login);
router.post(`${config.url}/remove`, auth.removeUser);
router.get('/login', auth.renderLogin);
router.get('/logout', auth.logout);

module.exports = router;
