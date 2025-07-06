const userService = require('../services/user.service');
const { successResponse, paginatedResponse } = require('../utils/apiResponse');

class UserController {
    async getAllUsers(req, res) {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const { users, pagination } = await userService.getAllUsers(page, size);
        paginatedResponse(res, users, pagination, "Users retrieved successfully");
    }

    async getAllAdminUsers(req, res) {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const { users, pagination } = await userService.getAllAdminUsers(page, size);
        paginatedResponse(res, users, pagination, "Admin users retrieved successfully");
    }

    async getCurrentUserProfile(req, res) {
        const user = await userService.getCurrentUser(req.user.id);
        successResponse(res, user, 'User profile retrieved successfully');
    }

    async updateCurrentUserProfile(req, res) {
        const updatedUser = await userService.updateCurrentUser(req.user.id, req.body);
        successResponse(res, updatedUser, 'Profile updated successfully');
    }

    async deleteUserById(req, res) {
        const deletedUser = await userService.deleteUserById(req.params.id);
        successResponse(res, deletedUser, 'User removed successfully');
    }

    async getUserById(req, res) {
        const user = await userService.getUserById(req.params.id);
        successResponse(res, user, 'User retrieved successfully');
    }

    async updateUserById(req, res) {
        const updatedUser = await userService.updateUserById(req.params.id, req.body);
        successResponse(res, updatedUser, 'User updated successfully');
    }
}

module.exports = new UserController();