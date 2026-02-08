// frontend/src/context/ChatContext.jsx
import React, { createContext, useState } from 'react';
export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [activeChat, setActiveChat] = useState(null);
  return <ChatContext.Provider value={{ activeChat, setActiveChat }}>{children}</ChatContext.Provider>;
}
