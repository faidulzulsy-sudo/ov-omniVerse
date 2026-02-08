// backend/controllers/userController.js
exports.getProfile = async (req, res, next) => {
  try {
    res.json({ message: 'getProfile (stub)' });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    res.json({ message: 'updateProfile (stub)' });
  } catch (err) {
    next(err);
  }
};
