const pubsub = require('../../../../config/pubsub.js')

const ConversationAdded = async ({ id }) => {
    return pubsub.asyncIterator(id)
}

module.exports = ConversationAdded