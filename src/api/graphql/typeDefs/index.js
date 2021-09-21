const { gql } = require("apollo-server-express");

const { MessageType, UserType, ConversationType } = require('./types')
const { BaseResponse, GetMessages, LoginUser, GetConversations, GetUser } = require('./Response')

const typeDefs = gql`
    interface Response {
        success:Boolean!
        message:String!
    }
    scalar Upload

    ${UserType}
    ${MessageType}
    ${ConversationType}

    ${BaseResponse}
    ${LoginUser}
    ${GetUser}
    ${GetConversations}
    ${GetMessages}

    
    type Query{
        getUser(username:String,id:String):GetUser!
        getConversations(id:ID!):GetConversations!
        getMessages(conversationId:ID!,isFull:Boolean):GetMessages!
    }
    type Subscription{
        conversationAdded(id:ID!):GetConversations!
        messageAdded(conversationId:ID!):GetMessages!
    }
    type Mutation{
        deleteDP(id:ID!):BaseResponse!
        deleteWallpaper(id:ID!userId:ID!):BaseResponse!
        deleteMessage(id:ID!,senderId:ID!,conversationId:ID!):BaseResponse!
        deleteConversation(conversationId:ID!):BaseResponse!
        deleteAccount(secret:Int!,id:ID!):BaseResponse!
        
        resetPassword(secret:Int!,email:String!):BaseResponse!
        resetSecretCode(email:String!):BaseResponse!
        changePassword(oldPassword:String!,newPassword:String!,id:ID!):BaseResponse!
        changeDetails(id:ID!,name:String,username:String,description:String):BaseResponse!
        logout(id:ID!):BaseResponse!
        loginUser(email:String!,password:String!,secret:Int!):LoginUser!
        
        createConversation(members:[String!]!):BaseResponse!
        createMessage(senderId:ID!,content:String!,conversationId:ID!):BaseResponse!
        createUser(name:String!,email:String!,username:String!,password:String!):BaseResponse!
    }
`;

module.exports = typeDefs