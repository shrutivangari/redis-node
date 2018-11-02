function addVisit(date, user, client) {
    var key = 'visits:' + date;
    client.PFADD(key, user);
}