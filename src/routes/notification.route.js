
const express = require('express');
const notificationController = require('../controllers/notification.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/user/register-fcm-token', authenticate, notificationController.registerDevice)
router.post('/send-test', authenticate, notificationController.sendTestNotification);

module.exports = router;