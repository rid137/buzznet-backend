const commentService = require('../services/comment.service');
const { successResponse, paginatedResponse } = require('../utils/apiResponse');

class CommentController {
    async  createComment(req, res) {
        const { content } = req.body;
        const postId = req.params.id;
        const userId = req.user.id;

        const comment = await commentService.createComment(postId, userId, content);
        successResponse(res, comment, 'Comment created successfully');
    };

    async getPostComments(req, res) {
        const postId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const { comments, pagination } = await commentService.getCommentsByPost(postId, page, size);
        paginatedResponse(res, comments, pagination, "Comments retrieved successfully");
    };

    async deleteComment(req, res) {
        const commentId = req.params.id;
        const userId = req.user.id;

        await commentService.deleteComment(commentId, userId);
        successResponse(res, {}, 'Comment deleted successfully');
    };

    async adminDeleteComment(req, res) {
        const commentId = req.params.id;
        const user = req.user;

        await commentService.adminDeleteComment(commentId, user);
        successResponse(res, {}, 'Comment deleted successfully');
    };
}

module.exports = new CommentController();