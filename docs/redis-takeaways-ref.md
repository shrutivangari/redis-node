# Redis points for reference -

## Redis when to use what -

1. Cache mechanisms
    - SET, GET, MSET, MGET
2. Cache with automatic expiration
    - SETEX, EXPIRE, EXPIREAT
3. Counting
    - INCR, INCRBY, DECR, DECRBY, INCRFLOATBY
4. Event Queue
    - Lists including Resque, Celery, Logstash
5. Storing most recent user posts
    - Twitter does this by storing latest tweets of a user in a List

## Redis key concepts
- Redis is single threaded
- Commands are atomic -> a race condition will never happen
