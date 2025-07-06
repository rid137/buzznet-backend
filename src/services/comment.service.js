const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { NotFound, BadRequest } = require('../utils/error/httpErrors');

class CommentService {
    async createComment(postId, userId, content) {
        if (!content) throw BadRequest('Content is required');

        const post = await Post.findByPk(postId);
        if (!post) throw NotFound('Post not found');

        const comment = await Comment.create({ content, userId, postId });
        await Post.increment('commentsCount', { where: { id: postId } });

        return comment;
    }

    async getCommentsByPost(postId, page = 1, size = 10) {
        const perPage = size;
        const currentPage = page;

        const offset = (currentPage - 1) * perPage;

        const { rows: comments, count: total } = await Comment.findAndCountAll({
            where: { postId },
            include: [{ 
                model: User,
                as: 'user',
                attributes: ['id', 'userName', 'firstName', 'lastName']
            }],
            order: [['createdAt', 'DESC']],
            limit: perPage,
            offset,
        });

        return {
            comments,
            pagination: {
                currentPage,
                perPage,
                totalDocuments: total,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async deleteComment(commentId, userId) {
        const comment = await Comment.findByPk(commentId);
        if (!comment) throw NotFound('Comment not found');
        const isOwner = comment.userId === userId;

        if (!isOwner) {
            throw BadRequest('Unauthorized to delete this comment');
        }

        await comment.destroy();

        await Post.decrement('commentsCount', { where: { id: comment.postId } });

        return true;
    }

    // async deleteComment(commentId, user) {
    //     const comment = await Comment.findByPk(commentId);
    //     if (!comment) throw NotFound('Comment not found');

    //     const isOwner = comment.userId === user.id;
    //     const isAdmin = user.role === 'admin';

    //     if (!isOwner && !isAdmin) {
    //         throw BadRequest('Unauthorized to delete this comment');
    //     }

    //     await comment.destroy();

    //     await Post.decrement('commentsCount', { where: { id: comment.postId } });

    //     return true;
    // }

    async adminDeleteComment(commentId, user) {
        const comment = await Comment.findByPk(commentId);
        if (!comment) throw NotFound('Comment not found');

        const isAdmin = user.role === 'admin';

        if (!isAdmin) {
            throw BadRequest('Unauthorized to delete this comment');
        }

        await comment.destroy();

        await Post.decrement('commentsCount', { where: { id: comment.postId } });

        return true;
    }
}

module.exports = new CommentService();