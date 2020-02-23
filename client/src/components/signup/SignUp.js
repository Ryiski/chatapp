import React, { useState } from 'react';
import Form from '../../container/form/Form';
import './style.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const Signup = ({ _signIn }) => {

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

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [newUser] = useMutation(NEW_USER,{ variables: { userName, password } });
        
    const _onSubmit = async (e) => {
        e.preventDefault();

        try{
            const { data:{ id, userName, token} } = await newUser()
            
            _signIn({ id, userName }, token)

        }catch(errors){

            const signUpErrors  = errors.graphQLErrors.reduce((acc,error) => {
                acc.push(error.message);
                return acc;
            },[]);

            setErrors(signUpErrors);
        }
        
        
    }

    return (
        <Form errors={errors} _onSubmit={_onSubmit}>
            <div className="signup-form">
                <label>Username</label>
                <input type="text" placeholder="John Doe" onChange={(e) => setUserName(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" >Sign up</button>
            </div>
        </Form>
    )
}

export default Signup