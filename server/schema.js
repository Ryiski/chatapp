const { gql } = require('apollo-server');

const typeDefs = gql`

#/**Messages**/

input MessageInput {
    userID: ID!
    userName:String!
    message: String!
}

type Messages {
    id:ID
    userID: ID
    userName:String
    message: String
    moment: String
}

#/**************/

#/**Registered User Login**/

input logInUserInput {
    userName: String!
    password: String!
}

type LogInUserPayload {
    id:ID!
    userName: String!
    token: String
}

#/**************/


#/**New User Register**/

type NewUserPayload {
    id:ID
    userName: String
    token: String
}

input NewUserInput {
    userName: String!
    password: String!
}

#/**************/


type Query {
    getMessages: [Messages!]!
}

type Mutation {
    userRegister(
        newUserInput: NewUserInput!
    ): NewUserPayload

    userLogin(
        logInUserInput: logInUserInput!
    ): LogInUserPayload

    newMessage(
        messageInput: MessageInput!
    ):Boolean

}

type Subscription {
    newMessage(userId: ID): Messages
}
`

module.exports = typeDefs;