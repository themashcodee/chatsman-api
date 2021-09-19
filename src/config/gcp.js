const { Storage } = require('@google-cloud/storage')
require('dotenv').config()

const storage = new Storage({
    projectId: process.env.GCP_PROJECT,
    credentials: { client_email: process.env.GCP_CLIENT_EMAIL, private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n') }
});
const bucket = storage.bucket(process.env.GCP_BUCKET);

module.exports = bucket