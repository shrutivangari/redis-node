require 'redis'
@redis = Redis.new(:host => "127.0.0.1", :port => 6379)

result = @redis.pipelined do
  @redis.sadd "cards:suits", "hearts"
  @redis.sadd "cards:suits", "spades"
  @redis.sadd "cards:suits", "diamonds"
  @redis.sadd "cards:suits", "clubs"
  @redis.smembers "cards:suits"
end

puts result


@redis.pipelined do
  @redis.set "message", "hello world"
  @message = @redis.get "message"
end

puts @message.value