var utils=require("./services/redis-utils.js");
var dataPrep=require("./services/data-prep.js");
var voting=require("./concepts/incr-decr");
var queue=require("./concepts/queue");
var hash=require("./concepts/hash");
var sets=require("./concepts/sets");
var sortedSets=require("./concepts/sortedsets");
var bitmaps=require("./concepts/bitmap");
var hyperloglog=require("./concepts/hyperloglog");
var logger = require("log4js").getLogger();

logger.level='info';

var client = utils.createClient();
votingSystemIncrementDecrement(client);
producerWorker(client);
consumerWorker(client);
displayHash(client);
setsAndDeals(client);
leaderboard(client);
client.quit();


//It is simpler to manipulate bytes with buffers than with JavaScript strings.
var clientBuffers = utils.createClient({return_buffers: true});
bitMapUserVisitCounts(clientBuffers);
clientBuffers.quit();


var client = utils.createClient();
numberOfVisitsToASiteHyperLogLog(client);
client.quit();

/**
 * Run the voting system to demonstrate incr-decr
 */
function votingSystemIncrementDecrement(client) {
  dataPrep.votingSystemdata(client);

  voting.upVote(12345, client); // article:12345 has 1 vote
  voting.upVote(12345, client); // article:12345 has 2 votes
  voting.upVote(12345, client); // article:12345 has 3 votes
  voting.upVote(10001, client); // article:10001 has 1 vote
  voting.upVote(10001, client); // article:10001 has 2 votes
  voting.downVote(10001, client); // article:10001 has 1 vote
  voting.upVote(60056, client); // article:60056 has 1 vote

  voting.showResults(12345, client);
  voting.showResults(10001, client);
  voting.showResults(60056, client);
}

/**
 * Producer Worker concept for a queue
 */
function producerWorker(client) {
   var logsQueue = new queue.Queue("logs", client);
   var MAX=5;
   for(var i=0;i<MAX;i++) {
        logsQueue.push("Hello World #"+i);
   }
   console.log("Created " + MAX + " logs");
}

function consumerWorker(client) {
    var logsQueue = new queue.Queue("logs", client);
    var MAX=5;
    for(var i=0;i<MAX;i++) {
        logsQueue.pop(function(err, replies) {
                if(err) {
                    console.log(err);
                }
                console.log("[consumer] Got log: "+ replies);
        });
    }

}

function displayHash(client) {
    hash.saveLink(123, "dayvson", "Maxxwell", "http://blah", client);
//    hash.upVote(123);
//    hash.upVote(123);
    hash.saveLink(456, "test", "blah", "http://blah/blah", client);
//    hash.upVote(123);
//    hash.downVote(456);
    hash.showDetails(123, client);
    hash.showDetails(456, client);
}

function setsAndDeals(client) {
    sets.markDealAsSent('deal:1','user:1',client);
    sets.markDealAsSent('deal:1','user:2',client);
    sets.markDealAsSent('deal:2','user:1',client);
    sets.markDealAsSent('deal:2','user:3',client);
    sets.sendDealIfNotSent('deal:1', 'user:1',client);
    sets.sendDealIfNotSent('deal:1', 'user:2',client);
    sets.sendDealIfNotSent('deal:1', 'user:3',client);

    sets.showUsersThatReceivedAllDeals(["deal:1", "deal:2"],client);
    sets.showUsersThatReceivedAtLeastOneOfTheDeals(["deal:1", "deal:2"],client);

}

function leaderboard(client) {
    var leaderBoard = new sortedSets.LeaderBoard("game-score", client);
    leaderBoard.addUser("Arthur", 70);
    leaderBoard.addUser("KC", 20);
    leaderBoard.addUser("Maxwell", 10);
    leaderBoard.addUser("Patrik", 30);
    leaderBoard.addUser("Ana", 60);
    leaderBoard.addUser("Felipe", 40);
    leaderBoard.addUser("Renata", 50);
    leaderBoard.addUser("Hugo", 80);
    leaderBoard.removeUser("Arthur");

    leaderBoard.getUserScoreAndRank("Maxwell");

    leaderBoard.showTopUsers(3);

    leaderBoard.getUsersAroundUser("Felipe", 5, function(users) {
      console.log("\nUsers around Felipe:");
      users.forEach(function(user) {
        console.log("#" + user.rank, "User:", user.username + ", score:", user.score);
      });
//      client.quit();
    });
}

function bitMapUserVisitCounts(clientBuffers) {
    bitmaps.storeDailyVisit('2015-01-01', '1', clientBuffers);
    bitmaps.storeDailyVisit('2015-01-01', '2', clientBuffers);
    bitmaps.storeDailyVisit('2015-01-01', '10', clientBuffers);
    bitmaps.storeDailyVisit('2015-01-01', '55', clientBuffers);

    bitmaps.countVisits('2015-01-01', clientBuffers);
    bitmaps.showUserIdsFromVisit('2015-01-01', clientBuffers);
}

function numberOfVisitsToASiteHyperLogLog(client) {
    var MAX_USERS = 200;
    var TOTAL_VISITS = 1000;

    for (var i = 0; i < TOTAL_VISITS; i++) {
        var username = 'user_' + Math.floor(1 + Math.random() * MAX_USERS);
        var hour = Math.floor(Math.random() * 24);
        hyperloglog.addVisit('2015-01-01T' + hour, username, client);
    }

    hyperloglog.count(['2015-01-01T0'], client); // 7
    hyperloglog.count(['2015-01-01T5', '2015-01-01T6', '2015-01-01T7'], client); // 8

    hyperloglog.aggregateDate('2015-01-01', client); // 9
    hyperloglog.count(['2015-01-01'], client); // 10
}

