const express = require("express");
const authController = require("../../controllers/auth.controller");
const { authorizeAdmin, authenticate } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticate, authorizeAdmin);
router.post("/create-user", authController.createUser);

module.exports = router;