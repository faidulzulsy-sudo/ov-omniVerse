// backend/controllers/friendController.js
exports.sendFriendRequest = async (req, res, next) => {
  try {
    res.json({ message: 'sendFriendRequest (stub)' });
  } catch (err) {
    next(err);
  }
};

exports.getFriends = async (req, res, next) => {
  try {
    res.json({ message: 'getFriends (stub)' });
  } catch (err) {
    next(err);
  }
};
