const pubsub = require('../../../../config/pubsub.js')

const MessageAdded = async ({ conversationId }) => {
    return pubsub.asyncIterator(conversationId)
}

module.exports = MessageAdded