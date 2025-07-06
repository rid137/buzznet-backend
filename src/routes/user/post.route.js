const express = require('express');
const { authenticate } = require('../../middlewares/auth.middleware');
const postController = require('../../controllers/post.controller');

const router = express.Router();

router
    .route("/")
    .get(postController.getAllPosts)
    .post(authenticate, postController.createPost)

router
    .route("/user-posts")
    .get(authenticate, postController.getAllUserPosts)

router
    .route("/:id")
    .get(postController.getPostById)
    .put(authenticate, postController.updatePost)
    .delete(authenticate, postController.deletePost)

module.exports = router;