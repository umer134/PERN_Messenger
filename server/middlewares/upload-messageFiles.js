const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../exceptions/api-error');

const uploadDir = path.join(__dirname, '..', 'uploads/message_files');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10,
  },
  fileFilter(req, file, cb) {
    const allowedPrefixes = [
      'image/',
      'video/',
      'audio/',
      'application/pdf',
      'text/',
      'application/zip',
      'application/x-zip-compressed',
      'application/msword',
      'application/vnd.openxmlformats-officedocument',
    ];

    const isAllowed = allowedPrefixes.some(prefix =>
      file.mimetype.startsWith(prefix)
    );

    if (!isAllowed) {
      return cb(ApiError.BadRequest(`Unsupported file type: ${file.mimetype}`));
    }

    cb(null, true);
  },
});

module.exports = upload;
