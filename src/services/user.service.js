const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { BadRequest, NotFound } = require('../utils/error/httpErrors');
const User = require('../models/user');

class UserService {
    async getAllUsers(page = 1, size = 10) {
        const perPage = size;
        const currentPage = page;

        const { rows: users, count: total } = await User.findAndCountAll({
            offset: (currentPage - 1) * perPage,
            limit: perPage,
            order: [['createdAt', 'DESC']],
        });

        return {
            users,
            pagination: {
                currentPage,
                perPage,
                totalDocuments: total,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async getAllAdminUsers(page = 1, size = 10) {
        const perPage = size;
        const currentPage = page;

        const offset = (currentPage - 1) * perPage;

        const { rows: users, count: total } = await User.findAndCountAll({
            where: { role: 'admin' },
            offset,
            limit: perPage,
            order: [['createdAt', 'DESC']],
        });

        return {
            users,
            pagination: {
                currentPage,
                perPage,
                totalDocuments: total,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }


    async getCurrentUser(userId) {
        const user = await User.findByPk(userId);

        if (!user) throw NotFound('User not found');
        return user;
    }

    async updateCurrentUser(userId, updates) {
        const [count, [updatedUser]] = await User.update(updates, {
            where: { id: userId },
            returning: true,
        });

        if (count === 0) throw NotFound('User not found');

        const userData = updatedUser.toJSON();
        delete userData.password;

        return userData;
    }

    async deleteUserById(userId) {
        const user = await User.findByPk(userId);
        if (!user) throw NotFound('User not found');
        if (user.role === 'admin') throw BadRequest('Cannot delete admin user');

        await user.destroy();
        return user;
    }

    async getUserById(userId) {
        const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
        });

        if (!user) throw NotFound('User not found');
        return user;
    }

    // async updateUserById(userId, updates) {
    //     const user = await User.findByPk(userId);
    //     if (!user) throw NotFound('User not found');

    //     const { firstName, lastName, email, role } = updates;

    //     user.firstName = firstName || user.firstName;
    //     user.lastName = lastName || user.lastName;
    //     user.email = email || user.email;
    //     user.role = role || user.role;

    //     const updatedUser = await user.save();
    //     const { password: _, ...userData } = updatedUser.toJSON();
    //     return userData;
    // }
    async updateUserById(userId, updates) {
        const [count, [updatedUser]] = await User.update(updates, {
            where: { id: userId },
            returning: true,
        });

        if (count === 0) throw NotFound('User not found');

        const userData = updatedUser.toJSON();
        delete userData.password;

        return userData;
    }
}

module.exports = new UserService();