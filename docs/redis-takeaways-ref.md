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
6. Data filtering
    - Sets eg. all flights that depart from a given city and arrive in another
7. Data grouping
    - Sets to use grouping all users who viewed similar products eg. recommendations on amazon.com
8. Membership checking
    - Sets for checking whether a user is on a blacklist
9. Real time waiting list for customer service/leaderboard of online game with top players/autocomplete system using millions of words
    - Sorted sets
10. Applications that involve real-time analytics, because they can tell wheter a user performaned an action or how many times an event occurred
    - Bitmaps

## Redis key concepts
- Redis is single threaded
- Commands are atomic -> a race condition will never happen
