const { gql } = require("apollo-server-express");
const UserType = require('./User')
const ConversationType = require('./Conversation')
const MessageType = require('./Message')

const { CreateUserInputType } = require('./Input')
const { ResetSecretCodeResponseType, LogoutResponseType, ChangePasswordResponseType, ChangeBasicDetailsResponseType, DeleteAccountReponseType, LoginUserResponseType, CreateUserResponseType, GetConversationsResponseType, CreateConversationResponseType, GetUserResponseType } = require('./Response')

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
    ${LogoutResponseType}
    ${DeleteAccountReponseType}
    ${ChangeBasicDetailsResponseType}
    ${ChangePasswordResponseType}
    ${ResetSecretCodeResponseType}

    ${CreateUserInputType}
    
    type Query{
        health: String!
        getUser(username:String,id:String):GetUserResponseType!
        getConversations:GetConversationsResponseType!
    }
    type Mutation{
        resetSecretCode(id:ID!):ResetSecretCodeResponseType!
        changePassword(oldPassword:String!,newPassword:String!,id:ID!):ChangePasswordResponseType!
        changeBasicDetails(name:String,username:String,id:ID!):ChangeBasicDetailsResponseType!
        logout(secret:Int!,id:ID!):LogoutResponseType!
        deleteAccount(secret:Int!,id:ID!):DeleteAccountReponseType!
        createConversation(name:String,members:[String!]!,isGroup:Boolean!,image:String):CreateConversationResponseType!
        loginUser(email:String!,password:String!,secret:Int!): LoginUserResponseType!
        createUser(payload:CreateUserInputType!): CreateUserResponseType!
    }
`;

module.exports = typeDefs