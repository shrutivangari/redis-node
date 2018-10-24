#Redis Commands Reference -

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
