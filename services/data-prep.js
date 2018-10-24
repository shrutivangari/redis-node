var utils=require("./redis-utils");
var logger = require("log4js").getLogger();

/**
 * Setup data for the voting system - increment decrement example
 * @param client - Redis client
 */
function votingSystemdata(client) {
  logger.info("Setting test data to redis");
  client.set("article:12345:headline", "Google Wants to Turn Your Clothes Into a Computer");
  client.set("article:10001:headline", "For Millennials, the End of the TV Viewing Party");
  client.set("article:60056:headline", "Alicia Vikander, Who Portrayed Denmark's Queen, Is Screen Royalty");
  logger.info("Printing test data");
  utils.getDataFromRedis(client, "article:12345:headline");
  utils.getDataFromRedis(client, "article:12345:headline");
}
module.exports = {
  votingSystemdata: votingSystemdata
}
