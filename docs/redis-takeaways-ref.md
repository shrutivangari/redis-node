#Redis points for reference -

##Redis when to use what -

1. Cache mechanisms
- SET, GET, MSET, MGET
2. Cache with automatic expiration
- SETEX, EXPIRE, EXPIREAT
3. Counting
- INCR, INCRBY, DECR, DECRBY, INCRFLOATBY

##Redis key concepts
- Redis is single threaded
- Commands are atomic -> a race condition will never happen
