// frontend/src/components/Chat/Message.jsx
import React from 'react';

export default function Message({ text, sender }) {
  return <div><strong>{sender}:</strong> {text}</div>;
}
