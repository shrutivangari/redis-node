function addVisit(date, user, client) {
    var key = 'visits:' + date;
    client.PFADD(key, user);
}

function count(dates, client) { // 1
    var keys = []; // 2
    dates.forEach(function(date, index) { // 3
        keys.push('visits:' + date);
    });

    client.PFCOUNT(keys, function(err, reply) { // 4
        console.log('Dates', dates.join(', '), 'had', reply, 'visits');
    });
}

function aggregateDate(date,client) { // 1
    var keys = ['visits:' + date]; // 2
    for (var i = 0; i < 24; i++) { // 3
        keys.push('visits:' + date + 'T' + i); // 4
    }
    client.PFMERGE(keys, function(err, reply) { // 5
        console.log('Aggregated date', date);
    });
}

module.exports = {
    addVisit: addVisit,
    count: count,
    aggregateDate: aggregateDate
}