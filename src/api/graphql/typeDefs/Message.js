const MessageType =
    `enum MessageType{
        IMAGE
        TEXT
    }
    type Message{
        id:ID!
        conversationId:ID!
        sender:User!
        time:Int!
        type:MessageType!
        content:String!
    }`

module.exports = MessageType