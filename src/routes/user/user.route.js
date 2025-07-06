const express = require('express');
const { authenticate } = require('../../middlewares/auth.middleware');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.use(authenticate);

router
  .route("/profile")
  .get(userController.getCurrentUserProfile)
  .put(userController.updateCurrentUserProfile);

module.exports = router;