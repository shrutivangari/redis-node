function transfer(client, from, to, value, callback) {
    client.get(from, function (err, balance) {
        console.log(balance);
        var multi = client.multi();
        multi.DECRBY(from, value);
        multi.INCRBY(to, value);

        multi.exec(function (err, reply) {
            console.log(reply);
            if (reply >= value) {
                callback(null, reply);
            } else {
                multi.discard();
                callback(new Error("Insufficient funds"), null);
            }

        });
    });
}

module.exports = {
    transfer: transfer
}