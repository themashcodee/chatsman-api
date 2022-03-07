const { createNodeRedisClient } = require('handy-redis');
require('dotenv').config();

const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;
const password = process.env.REDIS_PASSWORD;

const redisClient = createNodeRedisClient({ port, host, password });

module.exports = redisClient