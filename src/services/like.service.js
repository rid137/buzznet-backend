const Like = require('../models/like');
const Post = require('../models/post');
const User = require('../models/user');
const { NotFound, BadRequest } = require('../utils/error/httpErrors');

class LikeService {
    async likePost(userId, postId) {
        // const post = await Post.findOne({where: {id: postId}})
        const post = await Post.findByPk(postId)
        if(!post) throw NotFound('Post not found');
        const existing = await Like.findOne({ where: { userId, postId } });
        if (existing) throw BadRequest('Post already liked by user');

        await Like.create({ userId, postId });
        await Post.increment('likes', { where: { id: postId } });

        return { liked: true };
    }

    async unlikePost(userId, postId) {
        const existing = await Like.findOne({ where: { userId, postId } });
        if (!existing) throw NotFound('Like not found');

        await existing.destroy();
        await Post.decrement('likes', { where: { id: postId } });

        return { liked: false };
    }

    async getLikesByPost(postId, page = 1, size = 10) {
        const post = await Post.findByPk(postId)
        if(!post) throw NotFound('Post not found');

        const perPage = size;
        const currentPage = page;

        const offset = (currentPage - 1) * perPage;

        const { rows: likes, count: total } = await Like.findAndCountAll({
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
            likes,
            pagination: {
                currentPage,
                perPage,
                totalDocuments: total,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async getLikeCount(postId) {
        const post = await Post.findByPk(postId)
        if(!post) throw NotFound('Post not found');
        return await Like.count({ where: { postId } });
    }

    async isPostLikedByUser(userId, postId) {
        const post = await Post.findByPk(postId)
        if(!post) throw NotFound('Post not found');
        const existing = await Like.findOne({ where: { userId, postId } });
        return !!existing;
    }
}

module.exports = new LikeService();