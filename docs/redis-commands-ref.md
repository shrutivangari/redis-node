# Redis Commands Reference -

## SETS
* SET
Sets the key,value pair in Redis
* GET
Gets the value for a key in Redis
* MSET
Sets values of multiple keys at once
* MGET
Gets values of multiple keys at once
* EXPIRE
Adds expiration time in seconds to a given key, key is deleted after the expiration time
* TTL
Time to Live. Returns a positive integer if key has time to live, -2 if key is expired or does not exist, -1 if key exists but no expiration time is set
* INCR/DECR
Increments/Decrements a key by 1 and returns the incremented value
* INCRBY/DECRBY/INCRBYFLOAT
Increments/Decrements a key by the given integer/float and returns the incremented value
* LPUSH
Inserts data at the beginning of a List (left push)
* RPUSH
Inserts data at the end of a List (right push)
* LLEN
Length of a list
* LINDEX
Returns the element in a given index. Starts with 0, -1 is last, -2 is penultimate
* LRANGE
Returns an array with all elements from a given index range, including the elements in both the start and end indices
* LPOP
Returns and removes the first element of a list
* RPOP
Returns and removes the last element of a list
* BRPOP
Removes the last element of a Redis list. It is a blocking version or RPOP
* HSET
Sets a value to a field of a given key
* HMSET
Sets multiple field values to a key
* HINCRBY/HINCRBYFLOAT
Increments a field by a given integer/float
* HGET
Retrieves a field from a Hash
* HMGET
Retrieves multiple fields at once
* HDEL
Deletes a field from a hash
* HGETALL
Returns an array of all field/value pairs in a Hash
* HEKYS/HVALS
Retrieves all the keys and values
* SADD
Adds one or many members to a Set. Ignores members that already exist in a Set and returns number of added members
* SINTER
Returns an array with the members that belong to every set
* SDIFF
Returns an array with all members of the first Set that do not exist in the Sets that follow it
* SUNION
Returns an array with all members of all Sets. The result has no repeated members
* SRANDMEMBER
Returns random members from a Set. Sets are unordered, it cannot retrieve elements from a given position
* SISMEMBER
Checks whether a member exists in a Set. Returns 1 if yes, 0 if not
* SREM
Removes and returns members from a set
* SCARD
Returns the number of elements in a set (cardinality)
* SMEMBERS
Returns an array with all members of a set

## SORTED SET

* ZADD
Adds one or many members to a Sorted set, ignores members that already exist
* ZRANGE
Returns elements from the lowest to highest score, and it uses ascending lexicographical order if a score tie exists
* ZREVRANGE
Returns elements from the highest to the lowest score and it uses descending lexicographical order if a score tie exists
* ZREVRANGE WITHSCORES
Return elements with their scores
* ZREM
Removes a member from a Sorted Set
* ZSCORE
Returns score of a member
* ZRANK
Returns the member rank (or index) ordered from low to high. The member with the lowest score has rank 0
* ZREVRANK
Returns the member rank (or index) ordered from high to low. The member with the highest score has rank 0

## BITMAP
* SETBIT
Used to give a value to a Biptmap offset and it accepts only 1 or 0
* GETBIT
Returns the value of a Bitmap offset
* BITCOUNT
Returns the number of bits marked at 1 in a Bitmap
* BITSTOP
Requires a destination key, a bitwise operation and a list of keys to apply to that operation and store the result in the destination key. Available bitwise operations are OR, AND, XOR and NOT

## HYPDERLOGLOG
* PFADD
Adds one or many strings to a HyperLogLog. Returns 1 if the cardinality was changed and 0 if it remains the same
* PFCOUNT
Accepts one or many keys as arguments. When a single argument is specified, it returns the approximate cardinality. When multiple keys are specified, it returns the approximate cardinality of the union of all unique elements.
* PFMERGE
Merges all the specified HyperLogLogs and stores the result in the destination key

## TIME SERIRES
* MULTI
Multiple commands at the same time

## PUB/SUB
* PUBLISH
Sends a message to the Redis channel, and it returns the number of clients that received that message. A message gets lost if there are no clients subscribed to the channel when it comes in.
* SUBSCRIBE
Subscribe a client to one or many channels
* UNSUBSCRIBE
Unsubscribes a client from one or many channels
* PSUBSCRIBE/PUNSUBSCRIBE
Same as SUBSCRIBE/UNSUBSCRIBE but they accept glob-style patterns as channel names
Once a Redis client executes the command SUBSCRIBE/PSUBSCRIBE, it enters the subscribe mode and stops accepting commands, except for the command SUBSCRIBE/PSUBSCRIBE/UNSUBSCRIBE/PUNSUBSCRIBE
* PUBSUB
Introspects the state of the Redis Pub/Sub system. This command accepts three subcommands
** CHANNELS
Returns all active channels (channels with at least one subscriber). This command accepts an optional parameter, which is a glob-style pattern. If the pattern is specified, all channel names that match the pattern are returned; if no pattern is specified, all channel names are returned. PUBSUB CHANNELS [pattern]
** NUMSUB
Returns the number of clients connected to channels via the SUBSCRIBE command. This accepts many channel names as arguments. PUBSUB NUMSUB [channel-1....channel-N]
** NUMPAT
Returns the number of clients connected to channels via the PUBSUBSCRIBE command. This command does not accept channel patterns as arguments. PUBSUB NUMPAT

## TRANSACTION
* MULTI
Beginning of a transaction
* EXEC
Marks its end