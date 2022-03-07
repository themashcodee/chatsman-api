const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const secretCodeEmail = require('../api/email_design/index')
const resetPasswordEmail = require('../api/email_design/resetPassword')

async function sendSecretCode({ email, name, secret }) {
    try {
        const msg = {
            to: email,
            from: 'app.chatsman@gmail.com',
            subject: "Secret code for Chatsman",
            text: `Hey ${name}, here is your secret code that is required for any type of account modification ${secret}`,
            html: secretCodeEmail({ name, secret }),
        }
        await sgMail.send(msg)
    } catch (err) {
        console.log(err)
    }
}

async function sendPassword({ email, name, password }) {
    try {
        const msg = {
            to: email,
            from: 'app.chatsman@gmail.com',
            subject: "Temporary password for Chatsman",
            text: `Hey ${name}, This is a temporary password for your account. Login with this
            password and then change your password by going on setting page. Password : ${password}`,
            html: resetPasswordEmail({ name, password }),
        }
        await sgMail.send(msg)
    } catch (err) {
        console.log(err)
    }
}

module.exports = { sendSecretCode, sendPassword }