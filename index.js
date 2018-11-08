var logger = require("log4js").getLogger();
var demo = require("./demo");
var utils=require("./services/redis-utils.js");

logger.level='info';

/**
 * Demo incr, dec, queue, hash, sets
 */

var client = utils.createClient();
demo.votingSystemIncrementDecrement(client);
demo.producerWorker(client);
demo.consumerWorker(client);
demo.displayHash(client);
demo.setsAndDeals(client);
demo.leaderboard(client);
client.quit();


/**
 * Demo hyperloglog, timeseries
 */
//It is simpler to manipulate bytes with buffers than with JavaScript strings.
var clientBuffers = utils.createClient({return_buffers: true});
demo.bitMapUserVisitCounts(clientBuffers);
clientBuffers.quit();


var client = utils.createClient();
demo.numberOfVisitsToASiteHyperLogLog(client);
demo.timeSeries(client, "string");
demo.timeSeries(client, "hash");
demo.timeSeriesSortedSet(client, "sorted-set");
demo.timeSeries(client, "hyperloglog");
client.quit();

/**
 * Demo Pub/Sub
 */
var client = utils.createClient();
demo.pubSubPublisher(client, channel, command);
client.quit();