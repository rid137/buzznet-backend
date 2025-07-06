const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

class UploadService {
    async uploadFiles(files) {
        const filesArray = Array.isArray(files) ? files : [files];
        const uploadedFiles = [];

        for (const file of filesArray) {
            const tempFilePath = file.path;
            const originalFilename = file.originalname;

            if (!tempFilePath || !fs.existsSync(tempFilePath)) continue;

            const publicId = originalFilename
                ? originalFilename.split('.')[0]
                : `file_${Date.now()}`;

            try {
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'BuzzNet',
                            resource_type: 'auto',
                            public_id: publicId,
                        },
                        (error, result) => {
                            if (error) return reject(error);
                            if (result) return resolve(result);
                            reject(new Error('Upload failed with no result'));
                        }
                    );

                    fs.createReadStream(tempFilePath).pipe(stream);
                });

                uploadedFiles.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                    originalFilename,
                });

                // Delete the file after upload
                fs.unlinkSync(tempFilePath); 
            } catch (err) {
                console.error('Upload error:', err);
                if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
                }
            }
        }

        return uploadedFiles;
    }
}

module.exports = new UploadService();