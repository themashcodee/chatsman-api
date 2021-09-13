const randomSecret = require('./randomSecret')

const tempPassword = () => {
    const password = `${randomSecret()}psw@#$`
    return password
}

module.exports = tempPassword