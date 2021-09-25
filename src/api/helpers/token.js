const jwt = require('jsonwebtoken');
require('dotenv').config()

function createToken({ id }) {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60d' });
}

module.exports = { createToken }