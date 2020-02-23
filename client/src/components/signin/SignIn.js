import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from "react-router-dom";
import Form from '../../container/form/Form';
import './style.css';


const SignIn = ({ _signIn, ...rest }) => {
console.log("TCL: SignIn -> rest", rest)

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const USER_SIGN_IN = gql`
        mutation ($userName: String!,$password:String!){
            userLogin(
                logInUserInput:{
                    userName: $userName
                    password: $password
                }
                ){
                    id
                    userName
                    token
                }
        }
    `
    const [login] = useMutation(USER_SIGN_IN,{ variables: { userName, password } });

    const _onSubmit = async (e) =>{
        e.preventDefault();

        try{
           const { data:{userLogin:{ id, userName,token } } } = await login();
           _signIn({ id, userName }, token)
        }catch(errors){

            const signInErrors  = errors.graphQLErrors.reduce((acc,error) => {
                acc.push(error.message);
                return acc;
            },[]);

            setErrors(signInErrors);
        }
    }


    return (
        <Form _onSubmit={_onSubmit} errors={errors}>
            <div className="signup-form">
                <label>Username</label>
                <input type="text" placeholder="John Doe" onChange={(e) => setUserName(e.target.value)}/>
                <label>Password</label>
                <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Sign In</button>
            </div>
        </Form>


    )
}

export default SignIn