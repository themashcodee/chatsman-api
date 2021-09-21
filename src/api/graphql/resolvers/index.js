// MUTATIONS
const CreateUser = require('./mutations/CreateUser')
const CreateConversation = require('./mutations/CreateConversation')
const CreateMessage = require('./mutations/CreateMessage')

const ResetPassword = require('./mutations/ResetPassword')
const ResetSecretCode = require('./mutations/ResetSecretCode')
const ChangeDetails = require('./mutations/ChangeDetails')
const ChangePassword = require('./mutations/ChangePassword')
const LoginUser = require('./mutations/LoginUser')
const Logout = require('./mutations/Logout')

const DeleteWallpaper = require('./mutations/DeleteWallpaper')
const DeleteDP = require('./mutations/DeleteDP')
const DeleteAccount = require('./mutations/DeleteAccount')
const DeleteConversation = require('./mutations/DeleteConversation')
const DeleteMessage = require('./mutations/DeleteMessage')

// QUERIES
const GetUser = require('./queries/GetUser')
const GetConversations = require('./queries/GetConversations')
const GetMessages = require('./queries/GetMessages')
const GetLastMessage = require('./queries/GetLastMessage')

// SUBSCRIPTION
const { MessageAdded, ConversationAdded, LastMessageAdded } = require('./subscription/index')


const resolvers = {
    Query: {
        getUser: async (_, args, { User }, __) => await GetUser({ args, User }),
        getConversations: async (_, args, { User, Conversation, Message }) => await GetConversations({ Message, args, User, Conversation }),
        getMessages: async (_, args, { Message }) => await GetMessages({ args, Message }),
        getLastMessage: async (_, args, { Message }) => await GetLastMessage({ args, Message }),
    },
    Subscription: {
        messageAdded: { subscribe: async (_, { conversationId }) => await MessageAdded({ conversationId }) },
        conversationAdded: { subscribe: async (_, { id }) => await ConversationAdded({ id }) },
        lastMessageAdded: { subscribe: async (_, { conversationId }) => await LastMessageAdded({ conversationId }) },
    },
    Mutation: {
        deleteWallpaper: async (_, args, { Conversation, bucket }) => await DeleteWallpaper({ args, bucket, Conversation }),
        deleteDP: async (_, args, { User, bucket }) => await DeleteDP({ args, bucket, User }),
        deleteMessage: async (_, args, { pubsub, Message }) => await DeleteMessage({ pubsub, args, Message }),
        deleteAccount: async (_, args, { User, res, bucket, Conversation, Message }) => await DeleteAccount({ args, Message, User, res, Conversation, bucket }),
        deleteConversation: async (_, args, { pubsub, bucket, Conversation, Message }) => await DeleteConversation({ args, pubsub, Conversation, bucket, Message }),

        resetPassword: async (_, args, { User }) => await ResetPassword({ args, User }),
        resetSecretCode: async (_, args, { User }) => await ResetSecretCode({ args, User }),
        changePassword: async (_, args, { User }) => await ChangePassword({ args, User }),
        changeDetails: async (_, args, { User }) => await ChangeDetails({ args, User }),
        logout: async (_, args, { User, res }) => await Logout({ args, User, res }),
        loginUser: async (_, args, { User, res }) => await LoginUser({ args, User, res }),

        createMessage: async (_, args, { pubsub, Conversation, Message }) => await CreateMessage({ args, pubsub, Message, Conversation }),
        createConversation: async (_, args, { Conversation, pubsub, User }) => await CreateConversation({ pubsub, args, Conversation, User }),
        createUser: async (_, args, { User }) => await CreateUser({ args, User }),
    }
}

module.exports = resolvers