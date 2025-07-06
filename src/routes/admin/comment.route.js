const express = require('express');
const { authenticate, authorizeAdmin } = require('../../middlewares/auth.middleware.js');
const commentController = require('../../controllers/comment.controller.js');

const router = express.Router();

router.use(authenticate, authorizeAdmin);

router.delete("/:id", commentController.adminDeleteComment);

module.exports = router;