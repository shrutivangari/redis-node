# Redis Commands Reference

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
* ZPOP
Removes the first element of a Sorted Set

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
  - CHANNELS
Returns all active channels (channels with at least one subscriber). This command accepts an optional parameter, which is a glob-style pattern. If the pattern is specified, all channel names that match the pattern are returned; if no pattern is specified, all channel names are returned. PUBSUB CHANNELS [pattern]
  - NUMSUB
Returns the number of clients connected to channels via the SUBSCRIBE command. This accepts many channel names as arguments. PUBSUB NUMSUB [channel-1....channel-N]
  - NUMPAT
Returns the number of clients connected to channels via the PUBSUBSCRIBE command. This command does not accept channel patterns as arguments. PUBSUB NUMPAT

## TRANSACTION
* MULTI
Beginning of a transaction
* EXEC
Marks its end
* DISCARD
Discard the transaction
* WATCH
Make the execution of a transaction conditional which implements an optimistic lock on a group of keys. The command marks keys as being watched so that EXEC executes the transaction only if the keys being watched were not changed. Otherwise, it returns a null reply and the operation needs to be repeated; this is the reason it is called an optimistic lock
* UNWATCH
Removes keys from the watch list

## LUA
* Comment
--

* Global variable declaration 
x = 123

* Local variable declaration
local y = 456

* Function definition 
function hello_world()
    return "Hello World"
end

* Iteration 
for i = 1, 10 do
    print(i)
end

* Conditionals
if x == 123 then
    print("x is the magic number")
else 
    print("I have no idea what x is ")
end

* String concatenation
print("Hello" .. "World")

* Using a table as an array - arrays in Lua start indexing at 1, not at 0
data_types = {1.0, 123, "redis", true, false, hello_world}
print(data_types[3]) -- the output is "redis"

* Using a table as a hash
languages = {lua = 1993, javascript = 1995, python = 1991, ruby = 1995}
print("Lua was created in " .. languages["lua"])
print("JavaScript was created in " .. languages.javascript)

## Redis and Lua

* redis.call
Requires the command name and all its parameters, and it returns the result of the executed command. If there are errors, it aborts the script 

* redis.pcall
Is similar, but in the event of an error, it returns the error as a Lua table adn continues the script execution. Every script can return a value through the keyword return, and if there is no explicit return, the nil value is returned

* EVAL script numkeys key [key ...] arg [arg ...]
Runs a Lua script
The parameters are as follows:

script: The Lua script itself, as a string
numkeys: The number of Redis keys being passed as parameters to the script
key: The key name that will be available through the variable KEYS inside the script
arg: An additional argument that will be available through the variable ARGV inside the script


* EVALSHA
Runs a Lua script

## MISC
* INFO
Returns all Redis server statistics, including information about the Redis version, operating system, connected clients, memory usage, persistence, replication and keyspace. By default, it will show all the sections
* DBSIZE
Returns the number of existing keys in a Redis server
* DEBUG SEGFAULT
Crashes the Redis server process by performing an invalid memory access. To simulate bugs during development of your application
* MONITOR
SHoes all the commands processed by the Redis server in real time. It can be helpful for seeing how busy a Redis server is. It has a cost and an unscientific benchmark test says it could reduce throughput by 50% 
* CLIENT LIST
Returns a list of all clients connected to the server, as well as relevant information and statistics about the clients for example - IP Address, name and idle time
* CLIENT SETNAME
Command changes a client name; only useful for debugging purposes
* CLIENT KILL
Terminates a client connection. It is possible to terminate client connections by IP, port, ID or type
* FLUSHALL
Delets all keys from Redis - this cannot be undone
* RANDOMKEY
Returns a random existing key name. This can get an overview of the available keys in Redis
* KEYS
Analyzes all the existing keys in Redis. If the keyspace is large, it may block the Redis server entirely during its execution
* EXPIRE
Sets a timeout in seconds for a given key. The key will be deleted after the specified amount of seconds. A negative timeout will delete the key instantaneously (just like running the command DEL)
* EXPIREAT
Sets a timeout for a given key based on a Unix timestamp. A timestamp of the past will delete the key instantaneously
* TTL
Returns the remaining time to live (in seconds) of a key that has an associated timeout. If the key does not have an associated TTL, it returns -1 and if the key does not exist, it returns -2
* PTTL
Does the same thing as TTL but the return value is in milliseconds rather than seconds
* PERSIST
Removes the existing timeout of a given key. Such a key will never expire unless a new timeout is set. It returns 1 if the timeout is removed or 0 if the key does not have an associated timeout
* SETEX
Sets a value to a given key and also sets an expiration automatically. It is a combination of the commands SET and EXPIRE
* DEL
Removes one or many keys from Redis and returns the number of removed keys - this command cannot be undone
* EXISTS
Returns 1 if a certain key exists and 0 if it does not
* PING
Returns the string "PONG". It is useful for testing a server/client connection and verifying that Redis is able to exchange data.
* MIGRATE
Moves a given key to a destination Redis server. The is an atomic command and during the key migration both Redis servers are blocked. If the key already exists in the destination, this command fails unless the REPLACE parameter is specified
  - COPY - Keep the key in the local Redis server and create a copy in the destination Redis server
  - REPLACE - Replace the existing key in the destination server
* SELECT
Redis has a concept of multiple databases, each of which is identified by a number from 0 to 15 (there are 16 databases by default). It is not recommended to use multiple databases with Redis. A better approach would be to use multiple redis-server processes rather than a single one, because multiple processes are able to use multiple CPU cores and give better insights into bottlenecks.
The select command changes the current database that the client is connected to. The default database is 0.
* AUTH
Is used to authorize a client to connect to Redis. If authorization is enabled on the Redis server, clients are allowed to run commands only after executing the AUTH command with the right authorization key.
* SCRIPT KILL
Terminates the running Lua script if no write operations have been performed by the script. If the script has performed any write operations, the SHUTDOWN NOSAVE command must be used. There are three return values for this command:
  -  OK
  - NOTBUSY - Not scripts in execution right now
  - UNKILLABLE - Sorry the script already executed write commands against the dataset. You can either wait the script termination or kill the server in a hard way using the SHUTDOWN NOSAVE command
* SHUTDOWN
Stops all clients causes data to persist if enabled, and shuts down the Redis server. This command accepts one of the following optional parameters - 
  - SAVE - Forces Redis to save all of the data to a file called dump.rdb even if persistence is not enabled
  - NOSAVE - Prevents Redis from persisting data to the disk, even if persistence is enabled
* OBJECT ENCODING
Returns the encoding used by a given key
