import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ChatWindow = ({ complaintId, name }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageWindowRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/messages/${complaintId}`);
        setMessageList(res.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [complaintId]);

  useEffect(() => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  }, [messageList]);

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      const newMessage = {
        name,
        message: messageInput.trim(),
        complaintId,
      };

      const res = await axios.post('http://localhost:8000/messages', newMessage);
      setMessageList((prev) => [...prev, res.data]);
      setMessageInput('');
    } catch (error) {
      console.error('❌ Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h5 className="mb-3 text-primary">💬 Message Box</h5>
      <div className="message-window border rounded p-2 mb-2" ref={messageWindowRef}>
        {messageList.slice().reverse().map((msg) => (
          <div
            key={msg._id}
            className={`message ${msg.name === name ? 'own-message' : 'other-message'}`}
          >
            <p className="mb-1">
              <strong>{msg.name}:</strong> {msg.message}
            </p>
            <p className="timestamp text-muted small mb-2">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              , {new Date(msg.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="input-container d-flex flex-column">
        <textarea
          className="form-control mb-2"
          rows={2}
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="success" size="sm" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
