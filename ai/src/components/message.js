import React from 'react';

function Message({ message }) {
    return (
        <div className={`message ${message.sender}`}>
            <div className="message-content">
                {message.text}
            </div>
            <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
            </div>
        </div>
    );
}

export default Message;
