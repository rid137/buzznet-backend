const Post = require('../models/post');
const User = require('../models/user');
const { NotFound, BadRequest } = require('../utils/error/httpErrors');

class PostService {
    async createPost(userId, data) {
        if (!data.content) {
            throw BadRequest('Post must contain content');
        }

        const post = await Post.create({ ...data, userId });
        return post;
    }

    async getAllPosts(page = 1, size = 10) {
        const perPage = size;
        const currentPage = page;

        const offset = (currentPage - 1) * perPage;

        const { rows: posts, count: total } = await Post.findAndCountAll({
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
        posts,
        pagination: {
            currentPage,
            perPage,
            totalDocuments: total,
            totalPages: Math.ceil(total / perPage),
        },
        };
    }

    async getAllUserPosts(userId, page = 1, size = 10) {
        const perPage = size;
        const currentPage = page;

        const offset = (currentPage - 1) * perPage;

        const { rows: posts, count: total } = await Post.findAndCountAll({
            include: [{ 
                model: User, 
                as: 'user',
                attributes: ['id', 'userName', 'firstName', 'lastName']
            }],
            where: { userId },
            order: [['createdAt', 'DESC']],
            limit: perPage,
            offset,
        });

        return {
            posts,
            pagination: {
                currentPage,
                perPage,
                totalDocuments: total,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async getPostById(postId) {
        const post = await Post.findByPk(postId, {
            include: [{ 
                model: User,
                as: 'user',
                attributes: ['id', 'userName', 'firstName', 'lastName']
            }]
        });

        if (!post) throw NotFound('Post not found');
        return post;
    }

    async updatePost(userId, postId, updates) {
        const post = await Post.findOne({
            where: { id: postId, userId },
            include: [{ 
                model: User,
                as: 'user',
                attributes: ['id', 'userName', 'firstName', 'lastName']
            }]
        });

        if (!post) throw NotFound('Post not found');

        // Only allow content and media fields to be updated
        const allowedFields = ['content', 'media'];
        const filteredUpdates = {};

        for (const key of allowedFields) {
            if (key in updates) {
            filteredUpdates[key] = updates[key];
            }
        }

        const updatedPost = await post.update(filteredUpdates);

        return updatedPost;
    }


    async deletePost(postId, userId) {
        const post = await Post.findByPk(postId);

        if (!post) throw NotFound('Post not found');
        if (post.userId !== userId) throw BadRequest('You are not authorized to delete this post');

        await post.destroy();
        return true;
    }

    async adminDeletePost(postId) {
        const post = await Post.findByPk(postId);

        if (!post) throw NotFound('Post not found');

        await post.destroy();
        return true;
    }

    async adminUpdatePostStatus(postId, updates) {
        const post = await Post.findByPk(postId);

        if (!post) throw NotFound('Post not found');

        const allowedFields = ['status'];
        const filteredUpdates = {};

        for (const key of allowedFields) {
            if (key in updates) {
                filteredUpdates[key] = updates[key];
            }
        }

        const updatedPost = await post.update(filteredUpdates);

        return updatedPost;
    }
}

module.exports = new PostService();