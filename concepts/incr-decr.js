var logger = require("log4js").getLogger();

/**
 * Increment data
 * @param {integer} id - ID of the voter
 * @param client - Redis client
 */
function upVote(id, client) {
    var key = "article:" + id + ":votes";
    client.INCR(key);
}

/**
 * Decrement data
 * @param {integer} id - ID of the voter
 * @param client - Redis client
 */
function downVote(id, client) {
    var key = "article:" + id + ":votes";
    client.DECR(key);
}

/**
 * Show results with an MGET
 * @param {integer} id - ID of the voter
 * @param client - Redis client
 */
function showResults(id, client) {
    var headlineKey = "article:" + id + ":headline";
    var voteKey = "article: " + id + ":votes";
    client.MGET([headlineKey, voteKey], function (err, replies) {
        if (err) {
            logger.error("Something went wrong", err);
        } else {
            logger.info('The article "' + replies[0] + '" has', replies[1], 'votes');
        }
    });
}

module.exports = {
    upVote: upVote,
    downVote: downVote,
    showResults: showResults
}
