const bcrypt = require('bcrypt')
const createUserSecret = require('../../../helpers/createUserSecret')
const sendEmail = require('../../../../config/emailSender')

async function CreateUser({ args, User }) {
    try {
        const { name, email, password, username } = args.payload

        // CHECK IF USER ALREADY EXIST
        const isUserAlreadyExist = await User.findOne({ $or: [{ email }, { username }] })
        if (isUserAlreadyExist) return ({ success: false, message: 'Email or Username already exist!' })

        // CREATING USER IN MANGO DB
        const secret = createUserSecret()
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword, username, secret })
        await newUser.save()

        sendEmail({ email, name, secret })

        return {
            success: true,
            message: 'An Secret key has been sent to your email (check spam folder)'
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: 'There is some server error, try again later'
        }
    }
}

module.exports = CreateUser