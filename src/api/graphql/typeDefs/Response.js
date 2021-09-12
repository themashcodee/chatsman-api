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

const LogoutResponseType =
    `type LogoutResponseType implements ResponseType{
        success:Boolean!
        message:String!
    }
    `

const DeleteAccountReponseType =
    `type DeleteAccountReponseType implements ResponseType{
        success:Boolean!
        message:String!
    }
    `

module.exports = { DeleteAccountReponseType, LogoutResponseType, GetUserResponseType, GetConversationsResponseType, CreateConversationResponseType, LoginUserResponseType, CreateUserResponseType }