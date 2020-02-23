const { gql } = require('apollo-server');

const typeDefs = gql`

#/**Messages**/

input MessageInput {
    userID: ID!
    userName:String!
    message: String!
}

type Messages {
    userID: ID!
    userName:String!
    message: String!
    moment: String!
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

    # signOutUser(
    #     logInUserInput: logInUserInput!
    # ): Boolean

    newMessage(
        messageInput: MessageInput!
    ):Boolean!

}

type Subscription {
    newMessage: Messages!
}
`

module.exports = typeDefs;