const multer = require('multer');

const storage = multer.diskStorage({...});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Batas 10MB
});

router.post('/upload', upload.single('image'), (req, res) => {
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});
