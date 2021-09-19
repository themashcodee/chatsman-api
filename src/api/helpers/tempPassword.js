const randomSecret = require('./randomSecret')

const tempPassword = () => `${randomSecret()}psw@#$`

module.exports = tempPassword