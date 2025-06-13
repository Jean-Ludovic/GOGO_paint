import React, { useState } from 'react';
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour 👋 Comment puis-je vous aider aujourd’hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatbot/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      if (data.response) {
        // Effet lettre par lettre
        let displayedText = '';
        const fullText = data.response;
        const typingInterval = setInterval(() => {
          displayedText += fullText[displayedText.length];
          setMessages(prev => [...prev.slice(0, -1), { sender: 'bot', text: displayedText }]);
          if (displayedText.length >= fullText.length) {
            clearInterval(typingInterval);
          }
        }, 30); // vitesse de frappe ici

        // On prépare un message vide pour démarrer l'animation
        setMessages(prev => [...prev, { sender: 'bot', text: '' }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Aucune réponse reçue.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Erreur de connexion avec le serveur.' }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">💬 Espace Chat</div>

      <div className="chat-body">
        {messages.map((msg, index) => (
<div key={index} className={`chat-message ${msg.sender}`}>
  {msg.text.split('\n').map((line, i) => (
    <p key={i}>{line}</p>
  ))}
</div>

        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Écrivez votre message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
<button onClick={handleSend} disabled={loading}>
  {loading ? <span className="spinner"></span> : "Envoyer"}
</button>

      </div>
    </div>
  );
}

export default ChatPage;
