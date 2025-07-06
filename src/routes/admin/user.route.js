const express = require('express');
const { authenticate, authorizeAdmin } = require('../../middlewares/auth.middleware.js');
const userController = require('../../controllers/user.controller.js');

const router = express.Router();

router.use(authenticate, authorizeAdmin);

router.get("/all-users", userController.getAllUsers);
router.get("/admin-users", userController.getAllAdminUsers);
router
  .route("/current-user/:id")
  .delete(userController.deleteUserById)
  .get(userController.getUserById)
  .put(userController.updateUserById);

module.exports = router;