const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const emailHtml = require('../api/email_design/index')

async function sendEmail({ email, name, secret }) {
    try {
        const msg = {
            to: email,
            from: 'app.chatsman@gmail.com',
            subject: "Secret code for Chatsman",
            text: `Hey ${name}, here is your secret code that is required for any type of account modification ${secret}`,
            html: emailHtml({ name, secret }),
        }
        await sgMail.send(msg)
    } catch (err) {
        console.log(err)
    }
}

module.exports = sendEmail