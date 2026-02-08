// backend/controllers/uploadController.js
exports.uploadImage = async (req, res, next) => {
  try {
    // Expect req.file or req.files from multer
    res.json({ message: 'uploadImage (stub)', file: req.file ? req.file.originalname : null });
  } catch (err) {
    next(err);
  }
};
