const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

// @route   GET /api/chats
// @desc    Get all chats for a user
router.get('/', protect, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id
    })
    .populate('participants', 'username profilePicture isOnline')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/chats
// @desc    Create or find a chat
router.post('/', protect, async (req, res) => {
  try {
    const { userId, isGroupChat, groupName, participants } = req.body;

    if (isGroupChat) {
      // Create group chat
      const groupParticipants = [...participants, req.user._id];
      const chat = await Chat.create({
        participants: groupParticipants,
        isGroupChat: true,
        groupName,
        groupAdmin: req.user._id
      });

      const populatedChat = await Chat.findById(chat._id)
        .populate('participants', 'username profilePicture');

      res.status(201).json(populatedChat);
    } else {
      // Find or create one-on-one chat
      let chat = await Chat.findOne({
        isGroupChat: false,
        participants: { $all: [req.user._id, userId], $size: 2 }
      })
      .populate('participants', 'username profilePicture isOnline');

      if (!chat) {
        chat = await Chat.create({
          participants: [req.user._id, userId],
          isGroupChat: false
        });

        chat = await Chat.findById(chat._id)
          .populate('participants', 'username profilePicture isOnline');
      }

      res.json(chat);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/chats/:chatId/messages
// @desc    Get messages for a chat
router.get('/:chatId/messages', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
      isDeleted: false
    })
    .populate('sender', 'username profilePicture')
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;