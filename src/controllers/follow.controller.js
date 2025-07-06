const followService = require('../services/follow.service');
const { successResponse, paginatedResponse } = require('../utils/apiResponse');

class FollowController {
    async followUser(req, res) {
        const followerId = req.user.id;
        const followingId = req.params.id;

        const followRecord = await followService.followUser(followerId, followingId);
        return successResponse(res, followRecord, 'User followed successfully');
    };

    async unfollowUser(req, res) {
        const followerId = req.user.id;
        const followingId = req.params.id;

        await followService.unfollowUser(followerId, followingId);
        return successResponse(res, {}, 'User unfollowed successfully');
    };

    async getFollowing(req, res) {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const { following, pagination } = await followService.getFollowing(userId, page, size);
        paginatedResponse(res, following, pagination, "Following list retrieved successfully");
    };

    async getFollowers(req, res) {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const { followers, pagination } = await followService.getFollowers(userId, page, size);
        paginatedResponse(res, followers, pagination, "Followers list retrieved successfully");
    };

    async isFollowing(req, res) {
        const followerId = req.user.id;
        const followingId = req.params.id;

        const isFollowing = await followService.isFollowing(followerId, followingId);
        successResponse(res, { isFollowing }, 'Follow status checked');
    };
}

module.exports = new FollowController();