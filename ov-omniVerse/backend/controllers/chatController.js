// backend/controllers/chatController.js
exports.getChats = async (req, res, next) => {
  try {
    res.json({ message: 'getChats (stub)' });
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    res.json({ message: 'sendMessage (stub)' });
  } catch (err) {
    next(err);
  }
};
