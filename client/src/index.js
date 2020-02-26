import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';



const httpLink = new HttpLink({
  uri: 'http://localhost:5000/v1/graphql',
  credentials: 'same-origin',
  request: operation =>{
    const token = localStorage.getItem('token');
    operation.setContext({
      headers:{
        authorization: token ? token : null,
      }
    })
  },
    
  
});

const wsLink = new WebSocketLink({
  uri: `ws://192.168.1.10:5000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,

);

const client = new ApolloClient({
  link,
  // request: operation => {
  //   operation.setContext({
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`
  //     },
  //   });
  // },  
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
