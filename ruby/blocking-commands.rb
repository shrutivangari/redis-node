require 'redis'
@redis = Redis.new(:host => "127.0.0.1", :port => 6379)

@redis.rpush 'blocking:queue', 'first'
@redis.rpush 'blocking:queue', 'second'

puts @redis.blpop ['blocking:queue'], 0
puts @redis.brpop ['blocking:queue'], 0

@redis.lpush 'blocking:source', 'message'
puts @redis.brpoplpush 'blocking:source', 'blocking:destination', 0