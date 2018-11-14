# Redis Datatypes

## 1. String
- Can behave as an integer, float, text string, or bitmap based on its value
- Can store any kind of data: text (XML, JSON, HTML or raw text), integers, floats, or binary data (videos, images or audio files)
- Cannot exceed 512MB of text or binary data

## 2. Lists
- Ensure that concurrent systems will not overlap popping items from a queue
- List commands are atomic
- Redis lists are linked lists
- O(1) insertions and deletions
- O(n) search
- Max number = 2^32 - 1 => 4 billion elements per list

## 3. Hashes
- Optimized to use memory efficiently and look for data very fast
- Hash is a mapping of String to a String
- Internally, Hash can be a ziplist or a hashtable
- Ziplist = dually linked list designed to be memory efficient. In a ziplist, integers are stored as real integers rather than sequence of characters. Although a ziplist has memory optimizations, lookups are not performed in constant time.
- Hashtable has constant-time lookup but is not memory-optimized

## 4. Set
- Unordered collection of distinct strings, cannot add repeated elements to a Set
- Internally, Set is implemented as a hash table => some operations are optimized: member addition, removal and lookup = O(1)
- Set memory footprint will be reduced if all the members are integers
- Max no. of elements = 2^32 -1 => 4billion elements per set

## 5. Sorted Set
- Each element of a sorted set has an associated score
- Is a collection of nonrepeating Strings sorted by a score
- It is possible to have elements with repeated scores
- Repeated elements are ordered lexicographically
- Not as fast as Set operations because the scores need to be compared
- Adding, removing, updating an item in a Sorted set = O(log(N))
- Internally Sorted Sets are implemented as two separate data structures:
-- A skip list with a hash table - this allows fast search within an ordered sequence of elements
-- A ziplist
- Elements are added to a sorted set with a score and a string value. There are two ordering criteria: the element score and the element value. If a tie exists between the element scores, the lexicographical order of the element values is used to break the tie.

## 6. Bitmap/Bit Arrays/Bitsets
- Not a real data type, is a String
- Is a set of bit operations on a String
- Is a sequence of bits where each bit can store 0 or 1
- An array of ones and zeros
- indices = offsets
- Are memory efficient, support fast data lookups and can store up to 2^32 bits
- Bitmap implementation uses far less memory than the Set implementation
- Bitmaps are not always memory efficient

## 7. HyperLogLog
- Not a real data type, is an algorithm that uses randomization in order to provide a very good approximation of the number of unique elements that exist in the Set
- Runs in O(1) constant time
- Users a very small amount of memory
- Up to 12kB of memory per key
- Is probabilistic - it does not ensure 100% accuracy
- Error rate = 0.81%
- No practical limit for the cardinality of the sets that can be counted

# Other Stuff

## 1. Time Series
- An ordered sequence of values (data points) made over a time interval
- Face challenges with storage, since the dataset can grow too large very quickly
- As time goes by, the smallest granularities lose their values


## 2. Pub/Sub
- Publish-Subscribe which is a pattern where messages are not sent directly to specific receivers
- Publishers send messages to channels, subscribers receive these messages if they are listening to a given channel

## 3. Transactions
- A sequence of commands executed in order and atomically
- Any commands between MULTI and EXEC are serialized and executed as an atomic operation
- Does not serve any other client in the middle of a transaction
- All commands in a transaction are queued in the client and are only sent to the server when the EXEC command is executed
- It is possible to prevent a transaction from being executed by using the DISCARD command instead of EXEC
- Usually, Redis clients prevent a transaction from being sent to Redis if it contains command syntax errors
- Redis executes commands in order, if any of them fail, it proceeds to the next command
- Downside: It is not possible to make any decisions inside the transaction, since all the commands are queued

## 4. Pipelines
- A way to send multiple commands together to the Redis server without waiting for individual replies
- The replies are all read at once by the client
- The time taken for a Redis client to send a command and obtain a reply from the Redis server is called Round Trip Time (RTT)
- When multiple commands are sent, there are multiple RTTs
- Piplelines can decrease the number of RTTs because commands are grouped, so a pipeline with 10 commands will have only one RTT. This improve the network's performance significantly
- When Redis is used without pipelines, each command needs to wait for a reply
- Redis commands sent in a pipeline must be independent
- They run sequentially in the server (the order is preserved), but they do not run as a transaction
- Even though pipelines are neither transactional nor atomic - this means that different Redis commands may occur between the ones in the pipeline, they are still useful because they can save a lot of network time, preventing the network from becoming a bottleneck as it often does with a heavy load applications
