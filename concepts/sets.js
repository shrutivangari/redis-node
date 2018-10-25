function markDealAsSent(dealId, userId, client) {
    client.SADD(dealId, userId);
}

function sendDealIfNotSent(dealId, userId, client) {
    client.SISMEMBER(dealId, userId, function(err, reply) {
        if(reply) {
            console.log("Deal", dealId, "was already sent to the user", userId);
        } else {
            console.log("Sending", dealId, "to user", userId);
            markDealAsSent(dealId,userId,client);
        }
    });
}

function showUsersThatReceivedAllDeals(dealIds, client) {
    client.SINTER(dealIds, function(err, reply) {
        console.log(reply+ " received all of the deals: " + dealIds);
    });
}

function showUsersThatReceivedAtLeastOneOfTheDeals(dealIds, client) {
    client.SUNION(dealIds, function(err, reply) {
        console.log(reply+ " received at least one of the deals: " + dealIds);
    });
}

module.exports = {
    markDealAsSent: markDealAsSent,
    sendDealIfNotSent: sendDealIfNotSent,
    showUsersThatReceivedAllDeals: showUsersThatReceivedAllDeals,
    showUsersThatReceivedAtLeastOneOfTheDeals: showUsersThatReceivedAtLeastOneOfTheDeals
}