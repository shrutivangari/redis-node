var utils=require("./redis-utils.js");
var dataPrep=require("./data-prep.js");
var redis=require("redis");

function upVote(id, client) {
  var key = "article:" + id + ":votes";
  client.incr(key);
}

function downVote(id, client) {
  var key = "article:" + id + ":votes";
  client.decr(key);
}

function showResults(id, client) {
  var headlineKey = "article:" + id + ":headline";
  var voteKey = "article: " + id + ":votes";
  // client.get(headlineKey,redis.print);
  // client.get(voteKey,redis.print);
  client.mget([headlineKey, voteKey], function(err, replies) {
    console.log('The article "' + replies[0] + '" has', replies[1], 'votes');
  })
}

module.exports = {
  upVote: upVote,
  downVote: downVote,
  showResults: showResults
}
