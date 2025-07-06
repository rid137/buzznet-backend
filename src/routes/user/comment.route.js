const express = require('express');
const { authenticate } = require('../../middlewares/auth.middleware');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

router
    .route('/posts/:id/comments')
    .post(authenticate, commentController.createComment)
    .get(commentController.getPostComments);
    
router.delete('/comments/:id', authenticate, commentController.deleteComment);

module.exports = router;