const pubsub = require('../../../../config/pubsub.js')

const ConversationAdded = async ({ id }) => pubsub.asyncIterator(id)
const MessageAdded = async ({ conversationId }) => pubsub.asyncIterator(conversationId)
const StatusChanged = async ({ email }) => pubsub.asyncIterator(email)

module.exports = { ConversationAdded, MessageAdded, StatusChanged }