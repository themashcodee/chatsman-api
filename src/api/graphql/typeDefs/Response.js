const LoginUserResponseType =
    `type LoginUserResponseType implements ResponseType {
        success:Boolean!
        message:String!
        user: User
        token: String
    }`

const CreateUserResponseType =
    `type CreateUserResponseType implements ResponseType{
        success:Boolean!
        message:String!
    }`

const CreateConversationResponseType =
    `type CreateConversationResponseType implements ResponseType{
        success:Boolean!
        message:String!
        conversation:Conversation
    }`

const GetUserResponseType =
    `type GetUserResponseType implements ResponseType{
        success:Boolean!
        message:String!
        user:User
    }`

const GetConversationsResponseType =
    `type GetConversationsResponseType implements ResponseType{
        success:Boolean!
        message:String!
        conversations:[Conversation]
    }`

module.exports = { GetUserResponseType, GetConversationsResponseType, CreateConversationResponseType, LoginUserResponseType, CreateUserResponseType }