// backend/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadImage } = require('../controllers/uploadController');

router.post('/', upload.single('file'), uploadImage);

module.exports = router;
