var redis = require("redis");
var client = redis.createClient();
client.quit();

function zpop(key, callback) {
    client.watch(key, function (watchErr, watchReply) {
        client.zrange(key, 0, 0, function (zrangeErr, zrangeReply) {
            var multi = client.multi();
            multi.ZREM(key, zrangeReply);
            multi.EXEC(function (transactionErr, transactionReply) {
                if (transactionReply) {
                    callback(zrangeReply);
                } else {
                    zpop(key, callback);
                }
            });
        });
    });
}

//Deprecated:
// zpop(client, "presidents", function(member) {
//     console.log("The first president in the group is:", member);
//     client.quit();
// });


// module.exports = {
//     zpop: zpop
// }