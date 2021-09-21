const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose')
const User = require('./api/mongodb/models/User')
const Conversation = require('./api/mongodb/models/Conversation')
const Message = require('./api/mongodb/models/Message')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const refreshTokenRoute = require('./api/routes/refreshToken')
const profileImageUpload = require('./api/routes/profileImageUpload')
const backgroundUpload = require('./api/routes/backgroundUpload');
const conversationImageUpload = require('./api/routes/conversationimageupload');

const typeDefs = require('./api/graphql/typeDefs/index');
const resolvers = require('./api/graphql/resolvers/index');
const corsOption = require('./config/cors')

const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const pubsub = require('./config/pubsub')

const bucket = require('./config/gcp');


async function startApolloServer() {
    try {
        const app = express();

        const httpServer = createServer(app);
        const schema = makeExecutableSchema({ typeDefs, resolvers });

        const server = new ApolloServer({
            schema,
            context: ({ req, res }) => ({ token: req.headers.authorization, res, User, bucket, pubsub, Conversation, Message }),
            introspection: typeof window !== undefined,
            plugins: [{
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        }
                    };
                }
            }],
        });

        const subscriptionServer = SubscriptionServer.create({
            schema,
            execute,
            subscribe,
        }, {
            server: httpServer,
            path: server.graphqlPath,
        });


        await server.start();
        server.applyMiddleware({ app, cors: corsOption });

        app.use(
            cors(corsOption),
            express.json(),
            express.urlencoded({ extended: true }),
            cookieParser(),
            express.static('./src/images')
        )
        refreshTokenRoute(app)
        profileImageUpload(app)
        backgroundUpload(app)
        conversationImageUpload(app)

        await mongoose.connect(process.env.MANGO_DB_URI)

        httpServer.listen(process.env.PORT || 4000, () => console.log(`🚀 http://localhost:4000${server.graphqlPath}`));
    } catch (err) {
        console.log(err)
    }
}

startApolloServer()