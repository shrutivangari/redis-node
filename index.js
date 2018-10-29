var utils=require("./services/redis-utils.js");
var dataPrep=require("./services/data-prep.js");
var voting=require("./concepts/incr-decr");
var queue=require("./concepts/queue");
var hash=require("./concepts/hash");
var sets=require("./concepts/sets");
var sortedSets=require("./concepts/sortedsets");
var bitmaps=require("./concepts/bitmap");
var logger = require("log4js").getLogger();

logger.level='info';

var client = utils.createClient();
votingSystemIncrementDecrement();
producerWorker();
consumerWorker();
displayHash();
setsAndDeals();
leaderboard();
client.quit();


//It is simpler to manipulate bytes with buffers than with JavaScript strings.
var clientBuffers = utils.createClient({return_buffers: true});
bitmaps.storeDailyVisit(clientBuffers);

/**
 * Run the voting system to demonstrate incr-decr
 */
function votingSystemIncrementDecrement() {
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
function producerWorker() {
   var logsQueue = new queue.Queue("logs", client);
   var MAX=5;
   for(var i=0;i<MAX;i++) {
        logsQueue.push("Hello World #"+i);
   }
   console.log("Created " + MAX + " logs");
}

function consumerWorker() {
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

function displayHash() {
    hash.saveLink(123, "dayvson", "Maxxwell", "http://blah", client);
//    hash.upVote(123);
//    hash.upVote(123);
    hash.saveLink(456, "test", "blah", "http://blah/blah", client);
//    hash.upVote(123);
//    hash.downVote(456);
    hash.showDetails(123, client);
    hash.showDetails(456, client);
}

function setsAndDeals() {
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

function leaderboard() {
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