var utils = require("./redis-utils");
var redis = require("redis");

function votingSystemdata(client) {
  client.set("article:12345:headline", "Google Wants to Turn Your Clothes Into a Computer");
  client.set("article:10001:headline", "For Millennials, the End of the TV Viewing Party");
  client.set("article:60056:headline", "Alicia Vikander, Who Portrayed Denmark's Queen, Is Screen Royalty");
  client.get("article:12345:headline", redis.print);
}
module.exports = {
  votingSystemdata: votingSystemdata
}
