var channel = process.argv[2];
var command = process.argv[3];
client.PUBLISH(channel, command);
