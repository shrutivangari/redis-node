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
    client.get(key, function(err, bitmapValue) {
        var userIds=[];
        var data = bitmapValue.toJSON().data;

        data.forEach(function(byte, byteIndex) {
            for(var bitIndex=7; bitIndex>=0; bitIndex --) {
                var visited = byte >> bitIndex &1;
                if(visited === 1) {
                    var userId = byteIndex * 8 + (7 - bitIndex);
                    userIds.push(userId);
                }
            }
        });
        console.log("Users " + userIds + " visited on " + date);
    });
}
