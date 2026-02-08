// backend/controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res, next) => {
  try {
    // placeholder register logic
    res.json({ message: 'register endpoint (stub)' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    res.json({ token: generateToken({ id: 'userId' }) });
  } catch (err) {
    next(err);
  }
};
