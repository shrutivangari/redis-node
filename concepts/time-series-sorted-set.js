function TimeSeries(client, namespace) {
    this.namespace = namespace;
    this.client = client;
    this.units = {
        second: 1,
        minute: 60,
        hour: 60 * 60,
        day: 24 * 60 * 60
    };

    this.granularities = {
        '1sec': {name: '1sec', ttl: this.units.hour * 2, duration: this.units.second, quantity: this.units.minute * 2},
        '1min': {name: '1min', ttl: this.units.day * 7, duration: this.units.minute, quantity: this.units.hour * 2},
        '1hour': {name: '1hour', ttl: this.units.day * 60, duration: this.units.hour, quantity: this.units.day * 5},
        '1day': {name: '1day', ttl: null, duration: this.units.day, quantity: this.units.day * 30},
    };
};

TimeSeries.prototype.insert = function (client, timestampInSeconds, thing) {
    for (var granularityName in this.granularities) {
        var granularity = this.granularities[granularityName];
        var key = this._getKeyName(granularity, timestampInSeconds);
        var timestampScore = this._getRoundedTimestamp(timestampInSeconds, granularity.duration);
        var member = timestampScore + ":" + thing;
        this.client.ZADD(key, timestampScore, member);
        if (granularity.ttl !== null) {
            this.client.EXPIRE(key, granularity.ttl);
        }
    }
};

TimeSeries.prototype._getKeyName = function (granularity, timestampInSeconds) {
    var roundedTimestamp = this._getRoundedTimestamp(timestampInSeconds, granularity.quantity);
    return [this.namespace, granularity.name, roundedTimestamp].join(':');
};

TimeSeries.prototype._getRoundedTimestamp = function (timestampInSeconds, precision) {
    return Math.floor(timestampInSeconds / precision) * precision;
};


TimeSeries.prototype.fetch = function (client, granularityName, beginTimestamp, endTimestamp, onComplete) {
    var granularity = this.granularities[granularityName];
    var begin = this._getRoundedTimestamp(beginTimestamp, granularity.duration);
    var end = this._getRoundedTimestamp(endTimestamp, granularity.duration);
    var fields = [];
    var multi = this.client.multi();

    for (var timestamp = begin; timestamp <= end; timestamp += granularity.duration) {
        var key = this._getKeyName(granularity, timestamp);
        multi.zcount(key, timestamp, timestamp);
    }

    multi.exec(function (err, replies) {
        var results = [];
        for (var i = 0; i < replies.length; i++) {
            var timestamp = beginTimestamp + i * granularity.duration;
            var value = parseInt(replies[i], 10) || 0;
            results.push({timestamp: timestamp, value: value});
        }
        onComplete(granularityName, results);
    });
};

exports.TimeSeries = TimeSeries;