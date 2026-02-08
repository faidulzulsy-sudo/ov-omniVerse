// backend/routes/users.js
const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/me', getProfile);
router.put('/me', updateProfile);

module.exports = router;
