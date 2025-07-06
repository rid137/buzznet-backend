const express = require("express");
const formidable = require("express-formidable");
const uploadController = require("../controllers/upload.controller");

const router = express.Router();

router.post(
    "/",
    formidable({
        multiples: true,
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024,
    }),
    uploadController.uploadFiles
);

module.exports = router;