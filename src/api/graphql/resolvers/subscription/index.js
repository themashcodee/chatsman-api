const pubsub = require('../../../../config/pubsub.js')

const ConversationAdded = async ({ id }) => pubsub.asyncIterator(id)
const MessageAdded = async ({ conversationId }) => pubsub.asyncIterator(conversationId)

module.exports = { ConversationAdded, MessageAdded }