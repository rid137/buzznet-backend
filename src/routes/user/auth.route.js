const express = require("express");
const authController = require("../../controllers/auth.controller");
const { authenticate } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/request-otp", authController.requestOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/me", authenticate, authController.getCurrentUser);

module.exports = router;