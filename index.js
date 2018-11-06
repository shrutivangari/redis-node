var logger = require("log4js").getLogger();
var demo = require("./demo");
var utils=require("./services/redis-utils.js");

logger.level='info';

var client = utils.createClient();
demo.votingSystemIncrementDecrement(client);
demo.producerWorker(client);
demo.consumerWorker(client);
demo.displayHash(client);
demo.setsAndDeals(client);
demo.leaderboard(client);
client.quit();


//It is simpler to manipulate bytes with buffers than with JavaScript strings.
var clientBuffers = utils.createClient({return_buffers: true});
demo.bitMapUserVisitCounts(clientBuffers);
clientBuffers.quit();


var client = utils.createClient();
demo.numberOfVisitsToASiteHyperLogLog(client);
demo.timeSeries(client);
client.quit();