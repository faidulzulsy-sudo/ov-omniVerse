const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// @route   GET /api/friends/search
// @desc    Search users by username
router.get('/search', protect, async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        { 
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).select('username profilePicture isOnline');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/friends/request
// @desc    Send friend request
router.post('/request', protect, async (req, res) => {
  try {
    const { toUserId } = req.body;

    // Check if request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { from: req.user._id, to: toUserId },
        { from: toUserId, to: req.user._id }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already exists' });
    }

    // Create friend request
    const friendRequest = await FriendRequest.create({
      from: req.user._id,
      to: toUserId
    });

    // Populate the request
    const populatedRequest = await FriendRequest.findById(friendRequest._id)
      .populate('from', 'username profilePicture')
      .populate('to', 'username profilePicture');

    res.status(201).json(populatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/friends/requests
// @desc    Get friend requests
router.get('/requests', protect, async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      to: req.user._id,
      status: 'pending'
    })
    .populate('from', 'username profilePicture');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/friends/request/:requestId
// @desc    Accept/Reject friend request
router.put('/request/:requestId', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await FriendRequest.findById(req.params.requestId);

    if (!request || request.to.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status;
    await request.save();

    if (status === 'accepted') {
      // Add to each other's friends list
      await User.findByIdAndUpdate(request.from, {
        $addToSet: { friends: request.to }
      });
      await User.findByIdAndUpdate(request.to, {
        $addToSet: { friends: request.from }
      });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/friends
// @desc    Get user's friends
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friends', 'username profilePicture isOnline lastSeen');

    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;