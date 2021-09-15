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
    }`

module.exports = MessageType