function Partitioning(clients) {
    this.clients = clients;
}

Partitioning.prototype = {
    _getClient: function(key) {
        throw "Subclass should implement _getClient() method";
    },
    set: function(key, value) {
        var client = this._getClient(key);
        client.set.apply(client, arguments);
    },
    get: function(key) {
        var client = this._getClient(key);
        client.get.apply(client, arguments);
    }
};

module.exports = Partitioning;