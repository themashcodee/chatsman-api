const jwt = require('jsonwebtoken');
require('dotenv').config()

function createToken({ id, type }) {
    const secret = type === 'refresh' ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET
    const time = type === 'refresh' ? '60d' : '24h'

    return jwt.sign({ id }, secret, { expiresIn: time });
}

module.exports = { createToken }