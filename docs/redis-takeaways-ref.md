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
11. 
a. Counting the number of unique users who visited a website
b. Counting the number of distinct terms that were search for on your website on a specific date or time
c. Counting the number of distinct hashtags that were used by a user
d. Counting the number of distinct words that appear in a book
    - HyperLogLogs
12. 
a. Usage of specific words or terms in a newspaper over time
b. Minimum wage year-by-year
c. Daily changes in stock prices
d. Product purchases month-by-month
e. Climate changes
    - Time Series
13. 
a. News and weather dashboards
b. Chat applications
c. Push notifications, such as subway delay alerts
d. Remote code execution, similar to what the SaltStack took supports
    - Pub/Sub

## Redis key concepts
- Redis is single threaded
- Commands are atomic -> a race condition will never happen

## Redis common pitfalls - when to use what
1. The wrong data type for the job
- At Yipit, we used to store all deals that were going to be sent to users in a Redis Set. Although the solution worked, developers thought it was memory-inefficient because the Yipit user base was large. 
- To rectify this issue, some of the developers thought that changing the Set implementation to a Bitmap implementation would make the solution memory-efficient. 
- In other contexts, Bitmaps performed so well that developers thought they were the answer to everything—this turned out to be untrue.
- The Bitmap implementation used approximately 253 MB while the Set implementation used approximately 14 MB. The Bitmap implementation (which was supposed to be cheaper) costs 18 times more

2. Multiple Redis databases
- Do not use, deprecated.
- We can switch between databases using the command SELECT <dbid> - This is deprecated, do not use in prod
- In general, it is better to launch multiple Redis servers on the same machine rather than using multiple databases. Redis is single threaded. Thus,a single Redis server with multiple databases only uses one CPU core. 
- Some Redis clients do not even support multiple Redis databases since it would make it hard to create a thread-safe implementation

3. Keys without a namespace 
- It is good practice to use namespaces when defining your keys in Redis in order to avoid key name collisions and to organize your keys based on your application section or area
- Redis does not support namespacing
- Common way of adding a namespace to Redis keys is by prepending a namespace (name-space:key_name)

4. Using swap
- A Linux kernel parameter called swappiness controls when the operating system will start using the swap space
- Swap space is a portion of a hark disk drive that is used for virtual memory
- Values = 0 to 100
- Lower value tells the kernel to use the swap space less frequently 
- Higher values tells it to use the swap space more frequently
- Default value = 60
- vm.swappiness=0 -> Linux 3.5 and newer - Disables swap entirely; Linux 3.4 and older - Swap only to avoid an "out of memory" condition
- vm.swappiness=1 -> Linux 3.5 and newer - Minimum amount of swapping without disabling it entirely
- vm.swappiness=100 -> Linux will swap aggressively
- In a scenario where Redis needs to access from the swap space, the OS needs to move the necessary pages back into the rAM. During this process, Redis is blockd until the OS finishes its job
- Recommended: swappiness=0 when data always fits into RAM, 1 when you are not sure
- To disable swap usage, execute as the root user sysctl -w vm.swappiness=0
- To make the previous change permanent across reboots, change the file /etc/sysctl.conf as the root user to include the following vm.swappiness=0