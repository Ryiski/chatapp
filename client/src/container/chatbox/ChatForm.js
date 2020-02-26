

import React, { Fragment } from 'react'
import { useSubscription, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Message from '../../components/chatmessage/Message';

const ChatForm = ({ currentUser, children }) => {



    const REAL_TIME_MESSAGE = gql`
        subscription {
            newMessage {
                userID
                userName
                message
                moment
            }
        }
    `;

    const SEND_MESSAGE = gql`
        mutation sendMessage($userId: ID! $userName:String! $message:String!) {
            newMessage(messageInput:{
                userID:$userId,
                userName:$userName,
                message:$message
            })
        }
    `;

    const { loading, data, error } = useSubscription(REAL_TIME_MESSAGE);
    console.log("TCL: ChatForm -> loading", loading)
    console.log("TCL: ChatForm -> data", data)

    if (!loading) {
        const {
            id,
            userID,
            userName,
            message,
            moment } = data.newMessage;

        const li = `
        <li class="message-container ${ userID === currentUser.id ? 'right' : ''}">
            <span class="first-letter-username">${userName.toUpperCase()[0]}</span>
            <div >
                <p class="chat-message">${message}</p>
                <span class="time-stamp">${moment}</span>
            </div>
        </li>`;

        document.querySelector('.message-list').insertAdjacentHTML('beforeend', li);
    }

    const message = "asd" ;

    const [sendMessage] = useMutation(SEND_MESSAGE,{variables:{userId: currentUser.id ,userName:currentUser.userName, message:message}});


    const _onSubmit = async e => {
        e.preventDefault();
        try{
            
            const newmessage = await sendMessage();
        }catch(e){
        console.dir(e)
        }
        
    }

    const _onKeyUp = (e) => {
        const test = e.target.textContent;
        e.target.textContent = test;
    }

    return (
        <Fragment>
            <ul className="message-list">
                { children }
            </ul>
            <div className="chat-input">
                <form onSubmit={_onSubmit}>
                    <p contentEditable="true" data-placeholder="Insert text here..."></p>
                    <button type="submit">
                        <svg className="svgIcon" version="1.1" viewBox="0 0 16 16" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                            <path d="M11,8.3L2.6,8.8C2.4,8.8,2.3,8.9,2.3,9l-1.2,4.1c-0.2,0.5,0,1.1,0.4,1.5C1.7,14.9,2,15,2.4,15c0.2,0,0.4,0,0.6-0.1l11.2-5.6 C14.8,9,15.1,8.4,15,7.8c-0.1-0.4-0.4-0.8-0.8-1L3,1.1C2.5,0.9,1.9,1,1.5,1.3C1,1.7,0.9,2.3,1.1,2.9L2.3,7c0,0.1,0.2,0.2,0.3,0.2 L11,7.7c0,0,0.3,0,0.3,0.3S11,8.3,11,8.3z" fill="currentColor" />
                        </svg>
                    </button>
                </form>
            </div>
        </Fragment>
    )
}

export default ChatForm
