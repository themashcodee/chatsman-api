const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose')
const User = require('./api/mongodb/models/User')
const Conversation = require('./api/mongodb/models/Conversation')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const refreshTokenRoute = require('./api/routes/refreshToken')

const typeDefs = require('./api/graphql/typeDefs/index');
const resolvers = require('./api/graphql/resolvers/index');
const corsOption = require('./config/cors')

async function startApolloServer() {
    try {
        const app = express();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req, res }) => ({ token: req.headers.authorization, res, User, Conversation }),
            introspection: typeof window !== undefined,
        });

        await server.start();
        server.applyMiddleware({ app, cors: corsOption });

        app.use(cors(corsOption), express.json(), express.urlencoded({ extended: true }), cookieParser())
        refreshTokenRoute(app)

        await mongoose.connect(process.env.MANGO_DB_URI)

        app.listen(process.env.PORT || 4000, () => console.log(`🚀 http://localhost:4000${server.graphqlPath}`));
    } catch (err) {
        console.log(err)
    }
}

startApolloServer()