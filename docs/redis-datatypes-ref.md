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

## 4. Set
- Unordered collection of distinct strings, cannot add repeated elements to a Set
- Internally, Set is implemented as a hash table => some operations are optimized: member addition, removal and lookup = O(1)
- Set memory footprint will be reduced if all the members are integers
- Max no. of elements = 2^32 -1 => 4billion elements per set

## 5. Sorted Set
- Each element of a sorted set has an associated score
- Is a collection of nonrepeating Strings sorted by a score
- It is possible to have elements with repeated scores
- Repeated elements are ordered lexicographically
- Not as fast as Set operations because the scores need to be compared
- Adding, removing, updating an item in a Sorted set = O(log(N))
- Internally Sorted Sets are implemented as two separate data structures:
-- A skip list with a hash table - this allows fast search within an ordered sequence of elements
-- A ziplist
- Elements are added to a sorted set with a score and a string value. There are two ordering criteria: the element score and the element value. If a tie exists between the element scores, the lexicographical order of the element values is used to break the tie.

## 6. Bitmap/Bit Arrays/Bitsets
- Not a real data type, is a String
- Is a set of bit operations on a String
- Is a sequence of bits where each bit can store 0 or 1
- An array of ones and zeros
- indices = offsets
- Are memory efficient, support fast data lookups and can store up to 2^32 bits
- Bitmap implementation uses far less memory than the Set implementation
- Bitmaps are not always memory efficient