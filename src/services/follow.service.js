const Follow = require('../models/follow');
const User = require('../models/user');
const { NotFound, BadRequest, Conflict } = require('../utils/error/httpErrors');

class FollowService {
    async followUser(followerId, followingId) {
        if (followerId === parseInt(followingId)) {
            throw BadRequest("You can't follow yourself.");
        }

        const existingFollow = await Follow.findOne({
            where: { followerId, followingId },
        });

        if (existingFollow) {
            throw Conflict('You already follow this user.');
        }

        const userToFollow = await User.findByPk(followingId);
        if (!userToFollow) throw NotFound('User not found');

        const followRecord = await Follow.create({ followerId, followingId });
        return followRecord;
    }

    async unfollowUser(followerId, followingId) {
        const followRecord = await Follow.findOne({
            where: { followerId, followingId },
        });
        if (!followRecord) throw NotFound('Follow record not found');

        await followRecord.destroy();
        return true;
    }

    async getFollowers(userId, page = 1, size = 10) {
        const perPage = size;
        const currentPage = page;

        const offset = (currentPage - 1) * perPage;
        
        const { rows: followers, count: total } = await Follow.findAndCountAll({
            where: { followingId: userId },
            include: [{ 
                model: User,
                as: 'follower',
                attributes: ['id', 'userName', 'firstName', 'lastName']
            }],
            order: [['createdAt', 'DESC']],
            limit: perPage,
            offset,
        });

        return {
            followers,
            pagination: {
                currentPage,
                perPage,
                totalDocuments: total,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async getFollowing(userId, page = 1, size = 10) {
        const perPage = size;
        const currentPage = page;

        const offset = (currentPage - 1) * perPage;
        
        const { rows: following, count: total } = await Follow.findAndCountAll({
            where: { followerId: userId },
            include: [{ 
                model: User,
                as: 'following',
                attributes: ['id', 'userName', 'firstName', 'lastName']
            }],
            order: [['createdAt', 'DESC']],
            limit: perPage,
            offset,
        });

        return {
            following,
            pagination: {
                currentPage,
                perPage,
                totalDocuments: total,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async isFollowing(followerId, followingId) {
        const follow = await Follow.findOne({
            where: { followerId, followingId },
        });

        return Boolean(follow);
    }
}

module.exports = new FollowService();