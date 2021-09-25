// MUTATIONS
const CreateUser = require('./mutations/CreateUser')
const CreateConversation = require('./mutations/CreateConversation')
const CreateMessage = require('./mutations/CreateMessage')

const UnBlockUser = require('./mutations/UnBlockUser')
const BlockUser = require('./mutations/BlockUser')

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
const IsOnline = require('./queries/IsOnline')
const GetUser = require('./queries/GetUser')
const GetConversations = require('./queries/GetConversations')
const GetMessages = require('./queries/GetMessages')

// SUBSCRIPTION
const { MessageAdded, ConversationAdded, StatusChanged } = require('./subscription/index')


const resolvers = {
    Query: {
        isOnline: async (_, args) => await IsOnline({ args }),
        getUser: async (_, args, { User }, __) => await GetUser({ args, User }),
        getConversations: async (_, args, { User, Conversation }) => await GetConversations({ args, User, Conversation }),
        getMessages: async (_, args, { Message }) => await GetMessages({ args, Message }),
    },
    Subscription: {
        messageAdded: { subscribe: async (_, { conversationId }) => await MessageAdded({ conversationId }) },
        conversationAdded: { subscribe: async (_, { id }) => await ConversationAdded({ id }) },
        statusChanged: { subscribe: async (_, { email }) => await StatusChanged({ email }) },
    },
    Mutation: {
        deleteWallpaper: async (_, args, { Conversation, pubsub, bucket }) => await DeleteWallpaper({ args, bucket, Conversation, pubsub }),
        deleteDP: async (_, args, { User, bucket }) => await DeleteDP({ args, bucket, User }),
        deleteMessage: async (_, args, { pubsub, bucket, Message, Conversation }) => await DeleteMessage({ Conversation, pubsub, args, Message, bucket }),
        deleteAccount: async (_, args, { User, res, bucket, Conversation, Message }) => await DeleteAccount({ args, Message, User, res, Conversation, bucket }),
        deleteConversation: async (_, args, { pubsub, bucket, Conversation, Message }) => await DeleteConversation({ args, pubsub, Conversation, bucket, Message }),
        blockUser: async (_, args, { User }) => await BlockUser({ args, User }),
        unBlockUser: async (_, args, { User }) => await UnBlockUser({ args, User }),

        resetPassword: async (_, args, { User }) => await ResetPassword({ args, User }),
        resetSecretCode: async (_, args, { User }) => await ResetSecretCode({ args, User }),
        changePassword: async (_, args, { User }) => await ChangePassword({ args, User }),
        changeDetails: async (_, args, { User }) => await ChangeDetails({ args, User }),
        logout: async (_, args, { User, pubsub, res }) => await Logout({ args, pubsub, User, res }),
        loginUser: async (_, args, { User, res }) => await LoginUser({ args, User, res }),

        createMessage: async (_, args, { pubsub, Conversation, Message }) => await CreateMessage({ args, pubsub, Message, Conversation }),
        createConversation: async (_, args, { Conversation, pubsub, User }) => await CreateConversation({ pubsub, args, Conversation, User }),
        createUser: async (_, args, { User }) => await CreateUser({ args, User }),
    }
}

module.exports = resolvers