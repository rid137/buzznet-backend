const uploadService = require("../services/upload.service");
const { successResponse } = require("../utils/apiResponse");
const { BadRequest } = require("../utils/error/httpErrors");

class UploadController {
  async uploadFiles(req, res) {
    const files = req.files.files;
    if (!files || (Array.isArray(files) && files.length === 0)) {
      throw BadRequest('No files uploaded');
    }

    const uploadedFiles = await uploadService.uploadFiles(files);

    if (!uploadedFiles.length) {
      throw BadRequest('All file uploads failed');
    }

    return successResponse(res, {
      success: true,
      uploadedFiles,
      count: uploadedFiles.length,
      message:
        uploadedFiles.length === (Array.isArray(files) ? files.length : 1)
          ? 'All files uploaded successfully'
          : `Uploaded ${uploadedFiles.length} of ${Array.isArray(files) ? files.length : 1} files`,
    });
  };
}

module.exports = new UploadController();