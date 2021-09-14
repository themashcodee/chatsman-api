const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname.split(' ').join('-'))
    }
})

const uploadImage = multer({ storage: fileStorageEngine })

module.exports = uploadImage