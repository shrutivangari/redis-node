var utils=require("./redis-utils.js");
var dataPrep=require("./data-prep.js");
var voting=require("./incr-decr");

var client = utils.createClient();

//1. Voting system to demonstrate incr-decr
votingSystemIncrementDecrement();


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
  client.quit();
}
