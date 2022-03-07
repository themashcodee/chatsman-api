const redisClient = require('../../../../config/redis')

const IsOnline = async ({ args }) => {
    try {
        const { email } = args

        const isUserOnline = await redisClient.sismember('ONLINE_USERS', email)
        const lastseen = await redisClient.hget('LAST_SEEN', email)

        return { success: true, message: '', online: isUserOnline, lastseen }

    } catch (err) {
        return { success: false, message: 'There is some server error, try again later.' }
    }
}
module.exports = IsOnline