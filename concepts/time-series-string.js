function TimeSeriesString(client, namespace) {
    this.namespace = namespace;
    this.client = client;
    this.units = {
        second: 1,
        minute: 60,
        hour: 60 * 60,
        day: 24 * 60 * 60
    };

    this.granularities = {
        '1sec' : { name: '1sec', ttl: this.units.hour * 2, duration: this.units.second },// 6
        '1min' : { name: '1min', ttl: this.units.day * 7, duration: this.units.minute },// 7
        '1hour': { name: '1hour', ttl: this.units.day * 60 , duration: this.units.hour },// 8
        '1day' : { name: '1day', ttl: null, duration: this.units.day } // 9
    }
};

TimeSeriesString.prototype.insert = function(client, timestampInSeconds) {
    for(var granilarityName in this.granularities) {
        var granularity = this.granularities[granilarityName];
        var key = this._getKeyName(granularity, timestampInSeconds);
        this.client.INCR(key);
        if(granularity.ttl != null) {
            this.client.expire(key, granularity.ttl);
        }
    }
};

TimeSeriesString.prototype._getKeyName = function(granularity, timestampInSeconds) {
    var roundedTimestamp = this._getRoundedTimestamp(timestampInSeconds, granularity.duration);
    return [this.namespace, granularity.name, roundedTimestamp].join(':');
};

TimeSeriesString.prototype._getRoundedTimestamp = function(timestampInSeconds, precision) {
    return Math.floor(timestampInSeconds/precision) * precision;
};

TimeSeriesString.prototype.fetch = function(client, granularityName, beginTimestamp, endTimestamp, onComplete) {
    var granularity = this.granularities[granularityName];
    var begin = this._getRoundedTimestamp(beginTimestamp,  granularity.duration);
    var end = this._getRoundedTimestamp(endTimestamp, granularity.duration);
    var keys = [];

    for (var timestamp = begin; timestamp <= end; timestamp += granularity.duration) {
        var key = this._getKeyName(granularity, timestamp);
        keys.push(key);
    }

    this.client.MGET(keys, function(err, replies) {
        if(err) {
            console.log("Error getting keys");
        } else {
            var results = [];
            for (var i = 0 ; i < replies.length ; i++) {
                var timestamp = beginTimestamp + i * granularity.duration;
                var value = parseInt(replies[i], 10) || 0;
                results.push({timestamp: timestamp , value: value});
            }
            onComplete(granularityName, results);
        }
    });
};


exports.TimeSeries = TimeSeriesString;