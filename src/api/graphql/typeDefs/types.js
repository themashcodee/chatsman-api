const MessageType =
    `enum MessageType{
        IMAGE
        TEXT
    }
    type Message{
        id:ID!
        conversationId:ID!
        senderId:ID!
        type:MessageType!
        content:String!
        createdAt:String!
        updatedAt:String!
    }`

const ConversationType =
    `type Conversation{
        id:ID!
        members:[ID!]!
        wallpaper:String
        lastMessage:Message
        lastMessageTime:String
        updatedAt:String!
    }`

const UserType =
    `type User{
        id:ID!
        secret:Int!
        name:String!
        username:String!
        email:String!
        password:String!
        createdAt:String!
        image:String
        description:String
    }`;


module.exports = { MessageType, ConversationType, UserType }