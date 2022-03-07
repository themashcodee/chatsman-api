require('dotenv').config()
const cloudinary = require('cloudinary').v2
const path = require('path');
const DatauriParser = require('datauri/parser')
const parser = new DatauriParser();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function deleteImage(url) {
    await cloudinary.uploader.destroy(url.split('/')[7].split('.')[0])
}

async function uploadFile(file) {
    const fileToUpload = parser.format(path.extname(file.originalname).toString(), file.buffer)
    return (await cloudinary.uploader.upload(fileToUpload.content)).secure_url;
}

module.exports = { uploadFile, deleteImage }