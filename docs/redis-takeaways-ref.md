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

5. Not planning and configuring the memory properly
- During RDB snapshot creation and AOF rewriting, redis-server needs to duplicate itself ( it executes the fork() system call)
- If the Redis instance is very busy during the fork() call, it is possible that the copy-on-write strategy and overcommitting the memory is not enough
- In this case, the child process may need the same amount of memory - or an amount very close to it as the parent
- Assuming that Linux is the operating system, set the overcommit memory configuration to 1 to boost background saves
- Add "vm.overcommit_memory=1" to /etc/sysctl.conf
- THere is a configuration directive called maxmemory that limits the amount of memory that Redis is allowed to use (in bytes)
- Change this configuration to the approximate value based on the available memory and application requirements
- Redis should not use more than 50 percent of the available memory when any backup strategy is enabled. Make sure that you set up alarms for Redis memory usage

6. An approximate persistence strategy
- A reason for application's code to make redis slow -> periodic backup strategy
- When Redis starts the procedure to create an RDB snapshot or rewrite the AOF file, it creates a child process (using the fork() system call) and the new process handles the procedure
- During the fork() execution, the process is blocked and Redis will stop serving clients. This is when the perceived latency by clients increases
- To solve this
  * Disable the transparent huge pages Linux kernel feature echo never > /sys/kernel/mm/transparent_hugepage/enabled
  * Use an HVM instance
  * Use a persistence-only slave server, in which the slave does nothing but cause the replicated data to persist
  * Make backups less frequent, if possible, and then check whether the problem is mitigated
  * Disable automatic persistence in Redis. Make the data persist manually when Redis is not under heavy load (with a cron job or something similar)
  * Disable persistence if the data can be recreated easily and quickly
 
## Redis security
- Redis does not implement Access Control List (ACL
- AUTH authenticates a Redis client, it checks in the redis.conf file
- Need to disable FLUSHALL, CONFIG, KEYS, DEBUG and SAVE In prod
- Redis can be made secure by
  * Use firewall rules to block access from unknown clients
  * Run Redis on the loopback interface, rather than a publicaly accessible network interface
  * Run Redis in a virtual private cloud instead of the public internet
  * Encrypt client-to-server communication
- 

