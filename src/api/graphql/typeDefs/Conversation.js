const ConversationType =
    `type Conversation{
        id:ID!
        name:String
        isGroup:Boolean!
        members:[ID!]!
        image:String
    }`

module.exports = ConversationType