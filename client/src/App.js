import React, { useState, useEffect } from 'react';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import Pr from './Pr';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  const currentUser = JSON.parse(localStorage.getItem('curuser')) || null;
  const [ user, setUser ] = useState(currentUser);

  const _signIn = (userInfo, token) => {
    localStorage.setItem('curuser', JSON.stringify(userInfo));
    localStorage.setItem('token', JSON.stringify(token));
    
    return <Redirect to='/' />
  }
  
  return (
    <Router>
      <Pr user={user} exact path="/" component={() => <h1>Hello World</h1>} />
      <Route  path="/signup" component={(rest) => <SignUp {...rest} _signIn={_signIn}/>} />
      <Route _signIn={_signIn} path="/signin" render={(rest) => <SignIn {...rest} _signIn={_signIn}/>} />
    </Router>

  );
}

export default App;
