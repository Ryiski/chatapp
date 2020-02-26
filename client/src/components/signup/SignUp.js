import React, { useState } from 'react';
import Form from '../../container/form/Form';
import { Redirect, Link } from "react-router-dom";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import './style.css';


const Signup = ({ _signIn, history, ...rest }) => {

    const NEW_USER = gql`
        mutation NewUser($userName: String!,$password:String!) {
            userRegister(
                newUserInput:{
                userName: $userName
                password:$password
                }){
                    id
                    userName
                }
        }
    `;

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [newUser] = useMutation(NEW_USER);
        
    const _onSubmit = async (e) => {
        e.preventDefault();

        try{
            const { data:{ id, userName, token} } = await newUser({ variables: { userName:username, password } })
            
            _signIn({ id, userName }, token);

        }catch(errors){
        console.dir(errors)

            const signUpErrors  = errors.graphQLErrors.reduce((acc,error) => {
                acc.push(error.message);
                return acc;
            },[]);

            setErrors(signUpErrors);
        }
        
        
    }

    return (
        rest.user?
        <Redirect to='/'/>
        :
        <Form errors={errors} _onSubmit={_onSubmit}>
            <div className="signup-form">
                <label>Username</label>
                <input type="text" placeholder="John Doe" onChange={(e) => setUserName(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" >Sign up</button>

                <Link to="/signin">Already a member ? click here to login!</Link>
            </div>
        </Form>
    )
}

export default Signup