/*
 * The following code is a benchmark of this implementation, using 100,000 Sets with 12 deal IDs each, and each user will receive the same 12 deals.
 */
var redis = require("redis");
var sets = require("./benchmarks/sets");
var client = redis.createClient();

sets.benchmarkSets(client);
client.quit();