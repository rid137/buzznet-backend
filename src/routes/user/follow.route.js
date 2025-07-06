const express = require('express');
const followController = require('../../controllers/follow.controller');
const { authenticate } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.post('/follow/:id', followController.followUser);
router.delete('/unfollow/:id', followController.unfollowUser);
router.get('/followers', followController.getFollowers);
router.get('/following', followController.getFollowing);
router.get('/is-following/:id', followController.isFollowing);

module.exports = router;