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