import React, { useState } from 'react';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import ChatBox from './container/chatbox/ChatBox';
import Pr from './Pr';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {

  

  const currentUser = JSON.parse(localStorage.getItem('curuser')) || null;
  const [ user ] = useState(currentUser);
  
  const _signIn = (userInfo, token) => {
    localStorage.setItem('curuser', JSON.stringify(userInfo));
    localStorage.setItem('token', JSON.stringify(token));
    window.location.href = '/';
  }

  const _signOut = () => {
    localStorage.clear('curuser');
    return window.location.href = '/signin';
}
  
  return (
    <Router>
      <Pr user={user} exact path="/" component={(rest) => <ChatBox {...rest} currentUser={currentUser}/>} />
      <Route  path="/signup" render={(rest) => <SignUp {...rest} user={user} _signIn={_signIn}/>} />
      <Route  path="/signin" render={(rest) => <SignIn {...rest} user={user} _signIn={_signIn}/>} />
      <Route  path="/signout" component={_signOut} />
    </Router>

  );
}

export default App;
