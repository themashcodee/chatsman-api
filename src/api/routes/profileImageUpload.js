const uploadImage = require('../middlewares/multer')
const User = require('../mongodb/models/User')
const fs = require('fs')

function profileimageupload(app) {
    app.post('/profileimageupload', uploadImage.single('image'), async (req, res) => {
        try {
            const { filename } = req.file
            const userId = req.body.id

            const isUser = await User.findById(userId)
            if (!isUser) return res.json({ success: false, message: "User does not exist" })
            const url = `https://chatsmanapi.herokuapp.com/${filename}`

            if (!!isUser.image) {
                const alreadyExistImageName = url.substring(41)
                fs.unlinkSync(`./src/images/${alreadyExistImageName}`)
            }

            isUser.image = url
            await isUser.save()

            res.json({ success: true, message: "Profile Picture changed." })
        } catch (err) {
            res.json({ success: false, message: "There is some server error, try again later." })
        }
    })
}

module.exports = profileimageupload