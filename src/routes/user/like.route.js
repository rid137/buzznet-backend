const express = require('express');
const router = express.Router();
const likeController = require('../../controllers/like.controller');
const { authenticate } = require('../../middlewares/auth.middleware');


router.post('/posts/:id/like', authenticate, likeController.likePost);
router.delete('/posts/:id/unlike', authenticate, likeController.unlikePost);
router.get('/posts/:id/likes', likeController.getLikesByPost);
router.get('/posts/:id/likes/count', likeController.getLikeCount);
router.get('/posts/:id/likes/status', authenticate, likeController.checkIfUserLiked);

module.exports = router;