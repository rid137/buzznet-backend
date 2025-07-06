const authService = require('../services/auth.service');
const { createdResponse, successResponse } = require('../utils/apiResponse');
const createToken = require('../utils/createToken');

class AuthController {
  async register(req, res) {
    const user = await authService.register(req.body);
    const accessToken  = createToken(user.id);

    createdResponse(res, {
      accessToken
    }, 'OTP sent to email for verification');
  }

  async createUser(req, res) {
    const user = await authService.createUser(req.body);
    createdResponse(res, user, 'User created successfully');
  }

  async login(req, res) {
    const user = await authService.login(req.body);
    const accessToken  = createToken(user.id);

    successResponse(res, {accessToken}, 'Login successful');
  }

  async requestOtp(req, res) {
    await authService.requestOtp(req.body.email);
    successResponse(res, {}, 'OTP sent to email');
  }

  async verifyOtp(req, res) {
    const { email, code } = req.body;
    await authService.verifyOtp(email, code);
    successResponse(res, {}, 'Email verified successfully');
  }

  async forgotPassword(req, res) {
    await authService.forgotPassword(req.body.email);
    successResponse(res, {}, "Password reset link sent to email");
  }

  async resetPassword(req, res) {
    await authService.resetPassword(req.body);
    successResponse(res, {}, "Password updated successfully");
  }

  async getCurrentUser(req, res) {
    console.log("req user", req.user)
    const id = req.user.id;
    const user = await authService.getCurrentUser(id)
    
    successResponse(res, user, 'Fetched current user');
  }
}

module.exports = new AuthController();