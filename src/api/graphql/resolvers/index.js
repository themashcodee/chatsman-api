const CreateUser = require('./mutations/CreateUser')
const LoginUser = require('./mutations/LoginUser')
const CreateConversation = require('./mutations/CreateConversation')
const GetUser = require('./queries/GetUser')
const GetConversations = require('./queries/GetConversations')

const resolvers = {
    Query: {
        health: () => 'Pretty Good',
        getUser: async (_, args, { User }, __) => await GetUser({ args, User }),
        getConversations: (_, ___, { User, token, Conversation }, __) => GetConversations({ token, User, Conversation })
    },
    Mutation: {
        createConversation: async (_, args, { Conversation, User }, __) => await CreateConversation({ args, Conversation, User }),
        loginUser: async (_, args, { User, res }, __) => await LoginUser({ args, User, res }),
        createUser: async (_, args, { User }, __) => await CreateUser({ args, User }),
    }
}

module.exports = resolvers