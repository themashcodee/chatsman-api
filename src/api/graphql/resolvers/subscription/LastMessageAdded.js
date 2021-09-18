const pubsub = require('../../../../config/pubsub.js')

const LastMessageAdded = async ({ conversationId }) => {
    return pubsub.asyncIterator(`${conversationId}LM`)
}

module.exports = LastMessageAdded