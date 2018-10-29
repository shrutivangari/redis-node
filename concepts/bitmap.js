var logger=require("log4js").getLogger();

function storeDailyVisit(date, userId, client) {
    var key = 'visits:daily:' + date;
    client.setbit(key, userId, 1, function(err, reply) {
        if(err) {
            logger.error(err);
        }
        logger.info(reply);
        logger.info("User", userId, "visited on", date);
    });
}

function countVisits(date, client) {
    var key='visits:daily:'+date;
    client.bitcount(key, function (err, reply) {
        if(err) {
            logger.error(err);
        }
        logger.log(date, "had", reply, "visits.");
    });
}

function showUserIdsFromVisit(date, client) {
    var key='visits:daily:'+date;
    client.get(key, function(err, bitmapValue))
}