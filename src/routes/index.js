const express = require('express');
const adminAuthRoutes = require('./admin/auth.route')
const userAuthRoutes = require('./user/auth.route')
const userRoutes = require('./user/user.route')
const adminUserRoutes = require('./admin/user.route')
const userPostRoutes = require('./user/post.route')
const adminPostRoutes = require('./admin/post.route')
const adminCommentRoutes = require('./admin/comment.route')
const userCommentRoutes = require('./user/comment.route')
const uploadRoutes = require('./upload.route')
const likeRoutes = require('./user/like.route')
const followRoutes = require('./user/follow.route')
const notificationRoutes = require('./notification.route')

const app = express();

app.use("/auth", userAuthRoutes);
app.use("/admin/auth", adminAuthRoutes);

app.use("/user", userRoutes);
app.use("/admin", adminUserRoutes);

app.use("/posts", userPostRoutes);
app.use("/admin/posts", adminPostRoutes);

app.use("/upload", uploadRoutes);

app.use("/", userCommentRoutes);
app.use("/admin/comments", adminCommentRoutes);

app.use("/", likeRoutes);
app.use("/", followRoutes);
app.use("/", notificationRoutes);

module.exports = app