const postService = require('../services/post.service');
const { successResponse, createdResponse, paginatedResponse } = require('../utils/apiResponse');

class PostController {
    async createPost(req, res) {
        const userId = req.user.id;
        const post = await postService.createPost(userId, req.body);
        createdResponse(res, post, 'Post created successfully');
    }

    async getAllPosts(req, res) {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const { posts, pagination } = await postService.getAllPosts(page, size);
        paginatedResponse(res, posts, pagination, "Posts retrieved successfully");
    }

    async getAllUserPosts(req, res) {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const { posts, pagination } = await postService.getAllUserPosts(userId, page, size);
        paginatedResponse(res, posts, pagination, "Posts retrieved successfully");
    }

    async getPostById(req, res) {
        const postId = req.params.id
        const post = await postService.getPostById(postId);
        successResponse(res, post, 'Post retrieved successfully');
    }

    async updatePost(req, res) {
        const userId = req.user.id;
        const postId = req.params.id
        const updatedPost = await postService.updatePost(userId, postId, req.body);
        successResponse(res, updatedPost, 'Post updated successfully');
    }

    async deletePost(req, res) {
        const userId = req.user.id;
        const postId = req.params.id
        await postService.deletePost(postId, userId);
        successResponse(res, {}, 'Post deleted successfully');
    }

    async adminDeletePost(req, res) {
        const postId = req.params.id
        await postService.adminDeletePost(postId);
        successResponse(res, {}, 'Post deleted successfully');
    }

    async adminUpdatePostStatus(req, res) {
        const postId = req.params.id
        const updatedPost = await postService.adminUpdatePostStatus(postId, req.body);
        successResponse(res, updatedPost, 'Post updated successfully');
    }
}

module.exports = new PostController();