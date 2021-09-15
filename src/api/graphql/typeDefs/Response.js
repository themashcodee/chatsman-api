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

const ChangeBasicDetailsResponseType =
    `type ChangeBasicDetailsResponseType implements ResponseType{
        success:Boolean!
        message:String!
    }
    `

const ChangePasswordResponseType =
    `type ChangePasswordResponseType implements ResponseType{
        success:Boolean!
        message:String!
    }
    `

const ResetSecretCodeResponseType =
    `type ResetSecretCodeResponseType implements ResponseType{
        success:Boolean!
        message:String!
    }
    `
const ResetPasswordResponseType =
    `type ResetPasswordResponseType implements ResponseType{
        success:Boolean!
        message:String!
    }
    `

const CreateMessageResponseType =
    `type CreateMessageResponseType implements ResponseType{
        success:Boolean!
        message:String!
    }
    `

const GetMessagesResponseType =
    `type GetMessagesResponseType implements ResponseType{
        success:Boolean!
        message:String!
        messages:[Message]
    }
    `


module.exports = { GetMessagesResponseType, CreateMessageResponseType, ResetPasswordResponseType, ResetSecretCodeResponseType, ChangePasswordResponseType, ChangeBasicDetailsResponseType, DeleteAccountReponseType, LogoutResponseType, GetUserResponseType, GetConversationsResponseType, CreateConversationResponseType, LoginUserResponseType, CreateUserResponseType }