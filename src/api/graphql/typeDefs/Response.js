const LoginUser =
    `type LoginUser implements Response {
        success:Boolean!
        message:String!
        user: User
        token: String
    }`
const GetUser =
    `type GetUser implements Response{
        success:Boolean!
        message:String!
        user:User 
    }`
const GetConversations =
    `type GetConversations implements Response{
        success:Boolean!
        message:String!
        conversations:[Conversation]
    }`
const GetMessages =
    `type GetMessages implements Response{
        success:Boolean!
        message:String!
        messages:[Message]
    }`
const GetLastMessage =
    `type GetLastMessage implements Response{
        success:Boolean!
        message:String!
        messages:Message
    }`
const BaseResponse =
    `type BaseResponse {
        success: Boolean!
        message: String!
    }`

module.exports = { BaseResponse, GetLastMessage, GetMessages, GetUser, GetConversations, LoginUser }