const { gql } = require("apollo-server-express");
const UserType = require('./User')
const ConversationType = require('./Conversation')
const MessageType = require('./Message')

const { CreateUserInputType } = require('./Input')
const { LoginUserResponseType, CreateUserResponseType, GetConversationsResponseType, CreateConversationResponseType, GetUserResponseType } = require('./Response')

const typeDefs = gql`
    interface ResponseType{
        success:Boolean!
        message:String!
    }

    ${UserType}
    ${ConversationType}
    ${MessageType}

    ${CreateUserResponseType}
    ${LoginUserResponseType}
    ${CreateConversationResponseType}
    ${GetUserResponseType}
    ${GetConversationsResponseType}

    ${CreateUserInputType}
    
    type Query{
        health: String!
        getUser(username:String,id:String):GetUserResponseType!
        getConversations:GetConversationsResponseType!
    }
    type Mutation{
        createConversation(name:String,members:[ID!]!,isGroup:Boolean!,image:String):CreateConversationResponseType!
        loginUser(email:String!,password:String!,secret:Int!): LoginUserResponseType!
        createUser(payload:CreateUserInputType!): CreateUserResponseType!
    }
`;

module.exports = typeDefs