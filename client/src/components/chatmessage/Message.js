import React from 'react';
import './style.css';


const Message = ({aLetter, message, messageTime, isRight}) => {
    return (
        <li className={`message-container ${ isRight? 'right' : '' }`}>
            <span className="first-letter-username">{aLetter}</span>
            <div >
                <p className="chat-message">{message}</p>
                <span className="time-stamp">{messageTime}</span>
            </div>
        </li>)
}
export default Message
