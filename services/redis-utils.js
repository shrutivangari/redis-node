var redis = require("redis");
var logger = require("log4js").getLogger();

/**
 * Create a Redis client
 */
function createClient() {
  var client = redis.createClient();
  setDataInRedis(client, "my_key", "Hello world using Node.js and Redis");
  getDataFromRedis(client, "my_key");
  return client;
}

/**
 * Query for data in redis
 * @param client - Redis client
 * @param key - Query redis for a key
 */
function getDataFromRedis(client, key) {
  client.get(key, function(err, reply) {
    if(err) {
      logger.error(err);
    } else {
      redis.print;
      logger.info(reply);
    }
  });
}

/**
 * Setup data in redis
 * @param client - Redis client
 * @param key - set data for a key
 * @param value - set value for a key
 */
function setDataInRedis(client, key, value) {
  client.set(key,value);
}

module.exports = {
  createClient: createClient,
  getDataFromRedis: getDataFromRedis
}
