function LeaderBoard(key, client) {
    this.key = key;
    this.client = client;
}


LeaderBoard.prototype.addUser = function(username, score) {
    this.client.ZADD([this.key, score, username], function(err, replies) {
        console.log("User", username, "added to the leaderboard!");
    });
};

LeaderBoard.prototype.removeUser = function(username) {
    this.client.ZREM(this.key, username, function(err, replies) {
        console.log("User", username, "removed successfully!");
    });
};

LeaderBoard.prototype.getUserScoreAndRank = function(username) {
    var leaderboardKey = this.key;
    this.client.ZSCORE(leaderboardKey, username, function(err, zscoreReply) {
        if(err) {
            console.log("Error: ");
        }
//        this.client.ZREVRANK(leaderboardKey, username, function(err, zrevrankReply) {
//        if(err) {
//            console.log("Error: ");
//        }
//        console.log("\nDetails of " + username + ":");
//        console.log("Score:", zscoreReply + ",Rank: #" + (zscoreReply + 1));
//    });
   });
}

LeaderBoard.prototype.showTopUsers = function(quantity) { 
  this.client.ZREVRANGE([this.key, 0, quantity - 1, "WITHSCORES"], function(err, reply) { 
    console.log("\nTop", quantity, "users:");
    if(err) {
        console.log("Error", err);
    }
    for (var i = 0, rank = 1 ; i < reply.length ; i += 2, rank++) {
      console.log("#" + rank, "User: " + reply[i] + ", score:", reply[i + 1]);
    }
  });
};

LeaderBoard.prototype.getUsersAroundUser = function(username, quantity, callback) { 
  var leaderboardKey = this.key; 
  this.client.ZREVRANK(leaderboardKey, username, function(err, zrevrankReply) {
    if(err) {
        console.log("Error");
    }
    var startOffset = Math.floor(zrevrankReply - (quantity / 2) + 1); 
    if (startOffset < 0) { 
      startOffset = 0;
    }
    var endOffset = startOffset + quantity - 1; 
//
//    this.client.ZREVRANGE([leaderboardKey, startOffset, endOffset, "WITHSCORES"], function(err, zrevrangeReply) {
//      if(err) {
//        console.log("Error")
//      }
//      var users = [];
//      for (var i = 0, rank = 1 ; i < zrevrangeReply.length ; i += 2, rank++) {
//        var user = {
//          rank: startOffset + rank,
//          score: zrevrangeReply[i + 1],
//          username: zrevrangeReply[i],
//        }; 0
//        users.push(user);
//      }
//      callback(users);
//    });
  });
};

module.exports={
    LeaderBoard: LeaderBoard
}