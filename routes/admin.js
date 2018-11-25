const express = require('express');

const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/admin');
/* GET home page. */
router.post('/api/v3/signup', auth.TokenMiddleware, auth.setupPost);
router.put('/admin/distribution', auth.TokenMiddleware, controller.updateUserBase);
router.get('/admin/statistics', auth.TokenMiddleware, controller.renderStats);
router.get('/admin/remove', auth.TokenMiddleware, controller.renderRemove);
router.get('/admin/base', auth.TokenMiddleware, controller.renderBaseOP);
router.get('/admin/upload', auth.TokenMiddleware, controller.renderBaseUpload);
router.get('/admin/signup', auth.TokenMiddleware, controller.renderSignUP);
router.get('/admin', auth.TokenMiddleware, controller.renderIndex);


module.exports = router;
