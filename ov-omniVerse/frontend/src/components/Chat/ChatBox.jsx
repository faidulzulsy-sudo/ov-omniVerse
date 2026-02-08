import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Image as ImageIcon, Smile } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useChat } from '../../context/ChatContext'
import axios from 'axios'

const ChatBox = ({ chat }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState(null)
  const messagesEndRef = useRef(null)
  const { user } = useAuth()
  const { socket, sendMessage } = useChat()

  useEffect(() => {
    if (chat?._id) {
      fetchMessages()
      socket.emit('join_chat', chat._id)
    }

    socket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message])
    })

    socket.on('user_typing', ({ userId, isTyping }) => {
      if (userId !== user?._id) {
        setIsTyping(isTyping)
        if (isTyping) {
          const typingUser = chat.participants.find(p => p._id === userId)
          setTypingUser(typingUser)
        }
      }
    })

    return () => {
      socket.off('receive_message')
      socket.off('user_typing')
    }
  }, [chat?._id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/chats/${chat._id}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setMessages(response.data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const messageData = {
      chat: chat._id,
      sender: user._id,
      content: newMessage,
      createdAt: new Date()
    }

    // Send via socket
    socket.emit('send_message', {
      chatId: chat._id,
      message: messageData
    })

    // Also send to backend for storage
    await sendMessage(chat._id, newMessage)

    setNewMessage('')
    setIsTyping(false)
    socket.emit('typing', { chatId: chat._id, userId: user._id, isTyping: false })
  }

  const handleTyping = (e) => {
    setNewMessage(e.target.value)
    if (!isTyping) {
      socket.emit('typing', { chatId: chat._id, userId: user._id, isTyping: true })
      setTimeout(() => {
        socket.emit('typing', { chatId: chat._id, userId: user._id, isTyping: false })
      }, 3000)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={chat.isGroupChat ? 
                'https://via.placeholder.com/40' : 
                chat.participants.find(p => p._id !== user._id)?.profilePicture || 
                'https://via.placeholder.com/40'
              }
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            {!chat.isGroupChat && chat.participants.find(p => p._id !== user._id)?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold">
              {chat.isGroupChat 
                ? chat.groupName 
                : chat.participants.find(p => p._id !== user._id)?.username
              }
            </h3>
            {isTyping && typingUser && (
              <p className="text-sm text-gray-500">is typing...</p>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
              message.sender._id === user._id 
                ? 'bg-primary-600 text-white rounded-br-none' 
                : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-75 mt-1 text-right">
                {new Date(message.createdAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button type="submit" className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox