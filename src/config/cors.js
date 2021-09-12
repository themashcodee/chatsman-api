const corsOption = {
    origin: ['https://chatsman.vercel.app', 'http://localhost:3000'],
    // origin: 'http://localhost:3000',
    // 'https://studio.apollographql.com'
    // origin: "*",
    credentials: true,
}

module.exports = corsOption