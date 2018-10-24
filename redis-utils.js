var redis = require("redis");

function createClient() {
  var client = redis.createClient();
  client.set("my_key", "Hellp world using Node.js and Redis");
  client.get("my_key", redis.print);
  return client;
}

module.exports = {
  createClient: createClient
}
