import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function App() {
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);

    const startNewChat = () => {
        const newConversation = {
            id: Date.now(),
            title: "New Chat",
            messages: []
        };
        setConversations([...conversations, newConversation]);
        setActiveConversation(newConversation.id);
    };

    return (
        <div className="app">
            <Sidebar 
                conversations={conversations} 
                onNewChat={startNewChat}
                setActiveConversation={setActiveConversation}
            />
            <ChatWindow 
                conversation={conversations.find(c => c.id === activeConversation)} 
                setConversations={setConversations}
            />
        </div>
    );
}

export default App;
