

module.exports = function detectFileType(file) {
  if (file.mimetype.startsWith('image')) {
    return 'image';
  }

  if (file.mimetype.startsWith('video')) {
    return 'video';
  }

  if (file.mimetype.startsWith('audio')) {
    return 'audio';
  }

  return 'file';
}