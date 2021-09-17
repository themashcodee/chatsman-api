const CreateUser = require('./mutations/CreateUser')
const LoginUser = require('./mutations/LoginUser')
const Logout = require('./mutations/Logout')
const CreateConversation = require('./mutations/CreateConversation')
const GetUser = require('./queries/GetUser')
const GetConversations = require('./queries/GetConversations')
const DeleteAccount = require('./mutations/DeleteAccount')
const ChangeBasicDetails = require('./mutations/ChangeBasicDetails')
const ChangePassword = require('./mutations/ChangePassword')
const ResetSecretCode = require('./mutations/ResetSecretCode')
const ResetPassword = require('./mutations/ResetPassword')
const CreateMessage = require('./mutations/CreateMessage')
const GetMessages = require('./queries/GetMessages')

const MessageAdded = require('./subscription/MessageAdded')

const resolvers = {
    Query: {
        health: () => 'Pretty Good!',
        getUser: async (_, args, { User }, __) => await GetUser({ args, User }),
        getConversations: (_, ___, { User, token, Conversation }) => GetConversations({ token, User, Conversation }),
        getMessages: async (_, args, { Message }) => await GetMessages({ args, Message })
    },
    Subscription: {
        messageAdded: { subscribe: async (_, { conversationId }) => await MessageAdded({ conversationId }) },
    },
    Mutation: {
        createMessage: async (_, args, { pubsub, Conversation, Message }) => await CreateMessage({ args, pubsub, Message, Conversation }),
        resetPassword: async (_, args, { User }) => await ResetPassword({ args, User }),
        resetSecretCode: async (_, args, { User }) => await ResetSecretCode({ args, User }),
        changePassword: async (_, args, { User }) => await ChangePassword({ args, User }),
        changeBasicDetails: async (_, args, { User }) => await ChangeBasicDetails({ args, User }),
        deleteAccount: async (_, args, { User, res, Conversation, Message }) => await DeleteAccount({ args, Message, User, res, Conversation }),
        logout: async (_, args, { User, res }) => await Logout({ args, User, res }),
        createConversation: async (_, args, { Conversation, User }) => await CreateConversation({ args, Conversation, User }),
        loginUser: async (_, args, { User, res }) => await LoginUser({ args, User, res }),
        createUser: async (_, args, { User }) => await CreateUser({ args, User }),
    }
}

module.exports = resolvers