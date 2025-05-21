import React from 'react';

function Sidebar({ conversations, onNewChat, setActiveConversation }) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <button onClick={onNewChat} className="new-chat-btn">
                    + New Chat
                </button>
            </div>
            <div className="conversation-list">
                {conversations.map(conv => (
                    <div 
                        key={conv.id} 
                        className="conversation-item"
                        onClick={() => setActiveConversation(conv.id)}
                    >
                        {conv.title}
                    </div>
                ))}
            </div>
            <div className="sidebar-footer">
                <div className="user-profile">
                    <span>User</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
