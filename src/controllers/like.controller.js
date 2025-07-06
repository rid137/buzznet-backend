const likeService = require('../services/like.service');
const { successResponse, paginatedResponse } = require('../utils/apiResponse');

class LikeController {
    async likePost(req, res) {
        const userId = req.user.id;
        const postId = req.params.id;

        const result = await likeService.likePost(userId, postId);
        successResponse(res, result, 'Post liked successfully');
    }

    async unlikePost(req, res) {
        const userId = req.user.id;
        const postId = req.params.id;

        const result = await likeService.unlikePost(userId, postId);
        successResponse(res, result, 'Post unliked successfully');
    }

    async getLikesByPost(req, res) {
        const postId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const { likes, pagination } = await likeService.getLikesByPost(postId, page, size);
        paginatedResponse(res, likes, pagination, "Post likes retrieved successfully");
    }

    async getLikeCount(req, res) {
        const postId = req.params.id;

        const count = await likeService.getLikeCount(postId);
        successResponse(res, { count }, 'Like count retrieved successfully');
    }

    async checkIfUserLiked(req, res) {
        const userId = req.user.id;
        const postId = req.params.id;

        const liked = await likeService.isPostLikedByUser(userId, postId);
        successResponse(res, { liked }, 'Like status checked');
    }
}

module.exports = new LikeController();