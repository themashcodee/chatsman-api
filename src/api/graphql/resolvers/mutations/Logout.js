const redisClient = require('../../../../config/redis')

async function Logout({ args, User, pubsub, res }) {
    try {
        const { id } = args
        const isUser = await User.findById(id)
        if (!isUser) return { success: false, message: "User does not exist!" }

        await redisClient.srem('ONLINE_USERS', isUser.email)
        await redisClient.hset('LAST_SEEN', isUser.email, Date.now())

        const isUserOnline = await redisClient.sismember('ONLINE_USERS', isUser.email)
        const lastseen = await redisClient.hget('LAST_SEEN', isUser.email)
        pubsub.publish(
            isUser.email,
            { statusChanged: { success: true, message: '', online: isUserOnline, lastseen } }
        );

        res.cookie('refreshToken', null, {
            maxAge: 0,
            secure: true,
            path: '/',
            httpOnly: true,
            sameSite: 'none'
        })

        return { success: true, message: "User Logged out." }
    } catch (err) {
        return { success: true, message: "There is some server error, try again later." }
    }
}

module.exports = Logout