import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Message from '../../components/chatmessage/Message';
import ChatForm from './ChatForm';
import './style.css';

const ChatBox =  ({currentUser}) => {

    const GET_ALL_MESSAGES = gql`
        query{
            getMessages {
                id
                userID
                userName
                message
                moment
            }
        }
    `;

    const { data } =  useQuery(GET_ALL_MESSAGES);
    
    let messagesComponents = [];
    if(data){
        const { getMessages } = data;
        messagesComponents = getMessages.map(v => 
            (<Message
                key={v.id}
                aLetter={v.userName.toUpperCase()[0]} 
                message={v.message} 
                messageTime={v.moment} 
                isRight={v.userID === currentUser.id}
                
            />));
    }

    return (
        <div className="chat-box-container">
            <div className="inner-container">
                {/* <div >
                    <p>Online Users</p>
                    <ul className="online-list">
                        {[1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10].reverse().map(v => <li>{v}</li>)}
                    </ul>
                </div> */}
                <div className="chat-container">
                    <ChatForm currentUser={currentUser}>
                        {messagesComponents}
                    </ChatForm>
                </div>

            </div>
        </div>
    )
}

export default ChatBox
