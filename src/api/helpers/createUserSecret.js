function createUserSecret() {
    const secret = Math.floor((Math.random()) * 1000000)
    return secret
}

module.exports = createUserSecret