import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function Pr({ user, component, ...rest }) {

    const Component = component;
    
    return (
        <Route {...rest} render={
            (props) => 
            user? 
            <Component {...props} /> 
            : 
            <Redirect to="/signin" />}/>
    )
}

export default Pr
