import React, { useState } from 'react';
import Message from './Message';

function ChatWindow({ conversation, setConversations }) {
    const [inputMessage, setInputMessage] = useState('');
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || !conversation) return;
        
        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toISOString()
        };
        
        // Update conversation with user message
        setConversations(prev => prev.map(conv => 
            conv.id === conversation.id 
                ? {...conv, messages: [...conv.messages, userMessage]} 
                : conv
        ));
        
        setInputMessage('');
        
        // Simulate AI response
        setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                text: "This is a simulated response from DeepSeek AI. In a real implementation, this would connect to an actual AI API.",
                sender: 'ai',
                timestamp: new Date().toISOString()
            };
            
            setConversations(prev => prev.map(conv => 
                conv.id === conversation.id 
                    ? {...conv, messages: [...conv.messages, aiMessage]} 
                    : conv
            ));
        }, 1000);
    };

    return (
        <div className="chat-window">
            <div className="messages-container">
                {conversation?.messages.map(message => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Message DeepSeek Chat..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ChatWindow;
