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
demo.transactionBank(client);
client.quit();

/**
 * Demo Pub/Sub - run publisher.js and subscriber.js individually
 * 1. Open a terminal and type "node subscriber.js channel-1"
 * 2. Open a second terminal and type "node subscriber.js channel-2"
 * 3. Open a third terminal and type "node publisher.js global PING"
 * You should see PING on both the terminals
 * 4. On the third terminal type "node publisher.js channel-1 DATE"
 * On the first terminal you should see the current date
 * 5. On the third terminal type "node publisher.js channel-2 HOSTNAME"
 * On the second terminal you should see the host name
 */