const pubsub = require('../../../../config/pubsub.js')

const ConversationAdded = async ({ id }) => pubsub.asyncIterator(id)
const LastMessageAdded = async ({ conversationId }) => pubsub.asyncIterator(`${conversationId}LM`)
const MessageAdded = async ({ conversationId }) => pubsub.asyncIterator(conversationId)

module.exports = { ConversationAdded, LastMessageAdded, MessageAdded }