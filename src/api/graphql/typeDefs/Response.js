const LoginUser =
    `type LoginUser implements Response {
        success:Boolean!
        message:String!
        user: User
        token: String
    }`
const ChangeDetails =
    `type ChangeDetails implements Response {
        success:Boolean!
        message:String!
        user: User
    }`
const isOnline =
    `type isOnline implements Response{
        success:Boolean!
        message:String!
        online:Boolean
        lastseen:String
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
const BaseResponse =
    `type BaseResponse {
        success: Boolean!
        message: String!
    }`

module.exports = { isOnline, ChangeDetails, BaseResponse, GetMessages, GetUser, GetConversations, LoginUser }