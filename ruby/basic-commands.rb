require 'redis'
@redis = Redis.new(:host => "127.0.0.1", :port => 6379)

@redis.set "string:my_key", "Hello World"
puts @redis.get "string:my_key"

@redis.incr "string:counter"
puts @redis.mget ["string:my_key", "string:counter"]

@redis.rpush "list:my_list", ["item1", "item2"]
puts @redis.lpop "list:my_list"

@redis.hset "set:redis_book", "title", "Redis Essentials"
puts @redis.hgetall "set:redis_book"

@redis.sadd "set:users", ["alice", "bob"]
puts @redis.smembers "set:users"

@redis.zadd "sorted_set:programmers", 1940, "Alan Kay"
@redis.zadd "sorted_set:programmers", 1912, "Alan Turing"
puts @redis.zrange "sorted_set:programmers", 0, -1, :withscores => true

