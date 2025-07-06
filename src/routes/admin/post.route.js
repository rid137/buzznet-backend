const express = require('express');
const { authenticate, authorizeAdmin } = require('../../middlewares/auth.middleware.js');
const postController = require('../../controllers/post.controller.js');

const router = express.Router();

router.use(authenticate, authorizeAdmin);

router.delete("/:id", postController.adminDeletePost);
router
  .route("/status-update/:id")
  .put(postController.adminUpdatePostStatus);

module.exports = router;