async function GetUser({ args, User }) {
    try {
        const { username, id } = args
        console.log(username, id)

        // CHECK USER EXIST
        const isUserExist = await User.findOne({ $or: [{ _id: id }, { username }] })
        if (!isUserExist) return ({ success: false, message: 'User does not exist!' })

        console.log(isUserExist)
        return {
            success: true,
            message: 'User Exist',
            user: isUserExist
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            message: 'There is some server error, try again later'
        }
    }
}

module.exports = GetUser