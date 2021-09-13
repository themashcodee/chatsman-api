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

const resolvers = {
    Query: {
        health: () => 'Pretty Good',
        getUser: async (_, args, { User }, __) => await GetUser({ args, User }),
        getConversations: (_, ___, { User, token, Conversation }, __) => GetConversations({ token, User, Conversation })
    },
    Mutation: {
        resetPassword: async (_, args, { User }, __) => await ResetPassword({ args, User }),
        resetSecretCode: async (_, args, { User }, __) => await ResetSecretCode({ args, User }),
        changePassword: async (_, args, { User }, __) => await ChangePassword({ args, User }),
        changeBasicDetails: async (_, args, { User }, __) => await ChangeBasicDetails({ args, User }),
        deleteAccount: async (_, args, { User, res, Conversation }, __) => await DeleteAccount({ args, User, res, Conversation }),
        logout: async (_, args, { User, res }, __) => await Logout({ args, User, res }),
        createConversation: async (_, args, { Conversation, User }, __) => await CreateConversation({ args, Conversation, User }),
        loginUser: async (_, args, { User, res }, __) => await LoginUser({ args, User, res }),
        createUser: async (_, args, { User }, __) => await CreateUser({ args, User }),
    }
}

module.exports = resolvers