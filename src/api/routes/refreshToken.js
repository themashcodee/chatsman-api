const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../mongodb/models/User')
const { createToken } = require('../helpers/token')

function refreshTokenRoute(app) {
    app.get('/refreshtoken', async (req, res) => {
        if (!req.cookies.refreshToken)
            return res.json({ success: false, message: "User doesn't exist!" })

        jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, async function (err, result) {
            if (err) return res.json({ success: false, message: 'Invalid Expired!' })

            try {
                const isUser = await User.findById(result.id)
                if (!isUser) return res.json({ success: false, message: "User doesn't exist!" })

                const accessToken = createToken({ id: result.id, type: 'access' })
                res.json({ success: true, message: "Access token has been regenerated.", user: isUser, token: accessToken })
            } catch (err) {
                res.json({ success: false, message: 'There is some server error, try again later.' })
            }
        })
    })
}

module.exports = refreshTokenRoute