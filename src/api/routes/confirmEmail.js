const jwt = require('jsonwebtoken');
require('dotenv').config()
const UserModel = require('../mongodb/models/User')

function confirmEmailRoute(app) {
    app.get('/confirmemail/:token', (req, res) => {
        const result = jwt.verify(req.params.token, process.env.EMAIL_CONFIRM_TOKEN_SECRET, async function (err, result) {
            if (err) return res.send('It is a wrong or expired link')
            const foundUser = await UserModel.findById(result.id)
            if (!foundUser) return res.send('It is a wrong or expired link')
            if (foundUser.emailConfirmed === true) return res.send('Email is already verified!')
            foundUser.emailConfirmed = true
            foundUser.save()
            res.redirect('http://localhost:3000/signin')
        })
    })
}

module.exports = confirmEmailRoute