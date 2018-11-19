/*
 * The following code is a benchmark of this implementation, using 100,000 Sets with 12 deal IDs each, and each user will receive the same 12 deals.
 */
var redis = require("redis");
var sets = require("./benchmarks/sets");
var bitmaps = require("./benchmarks/bitmaps");


/**
 * # Memory
 used_memory:14860000
 used_memory_human:14.17M
 used_memory_rss:147779584
 used_memory_peak:2542119984
 used_memory_peak_human:2.37G
 used_memory_lua:35840
 mem_fragmentation_ratio:9.94
 mem_allocator:libc

 */
var client = redis.createClient();
sets.benchmarkSets(client);
client.quit();


/**
 * # Memory
 used_memory:266060416
 used_memory_human:253.73M
 used_memory_rss:337969152
 used_memory_peak:2542119984
 used_memory_peak_human:2.37G
 used_memory_lua:35840
 mem_fragmentation_ratio:1.27
 mem_allocator:libc

 */
var client = redis.createClient();
bitmaps.benchmarkBitmaps(client);
client.quit();

/**
 The Bitmap implementation used approximately 253 MB while the Set implementation used approximately 14 MB. The Bitmap implementation (which was supposed to be cheaper) costs 18 times more in the scenario described earlier.
 */