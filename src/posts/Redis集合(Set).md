id: 66
title: Redis 集合(Set)
date: 2018-06-29
category: redis
tags: redis
description: Redis 集合也是用来保存多个字符串元素的数据类型。和列表类型不一样，集合中不允许有重复元素，并且集合中的元素是无序的，不能通过索引下标获取元素。

------
Redis 集合也是用来保存多个字符串元素的数据类型。和列表类型不一样，集合中不允许有重复元素，并且集合中的元素是无序的，不能通过索引下标获取元素。集合是通过哈希表实现的，所以添加、删除、查找的复杂度都是`O(1)`。

### SADD KEY_NAME member [member ...]
将一个或多个成员元素加入到集合中，已经存在于集合的成员元素将被忽略。假如`KEY_NAME`不存在，则创建一个只包含添加的元素作成员的集合。
返回被添加到集合中的新元素的数量，不包括被忽略的元素。当`KEY_NAME`不是集合类型时，返回一个错误。
```
127.0.0.1:6379> SADD set1 a b c d
(integer) 4
127.0.0.1:6379> SADD set1 a e
(integer) 1
```

### SMEMBERS KEY
获取集合中的所有元素
```
127.0.0.1:6379> SMEMBERS set1
1) "c"
2) "b"
3) "d"
4) "a"
5) "e"
127.0.0.1:6379> SADD set1 f
(integer) 1
127.0.0.1:6379> SMEMBERS set1
1) "b"
2) "d"
3) "a"
4) "c"
5) "e"
6) "f"
```

### SCARD KEY_NAME
获取集合中元素的个数，不会遍历每个元素，而是直接用Redis内部的变量。
```
127.0.0.1:6379> SCARD set1
(integer) 6
127.0.0.1:6379> SADD set1 g
(integer) 1
127.0.0.1:6379> SCARD set1
(integer) 7
127.0.0.1:6379> SADD set1 a
(integer) 0
127.0.0.1:6379> SCARD set1
(integer) 7
```

### SISMEMBER KEY_NAME member 
判断`member`元素是否是集合的成员，如果是集合中的成员返回`1`，如果不是集合中的成员，或者键不存在，返回`0`。
```
127.0.0.1:6379> SMEMBERS set1
1) "g"
2) "b"
3) "a"
4) "c"
5) "e"
6) "f"
7) "d"
127.0.0.1:6379> SISMEMBER set1 d
(integer) 1
127.0.0.1:6379> SISMEMBER set1 x
(integer) 0
```

### SREM KEY_NAME member [member ...]
用于移除集合中的一个或多个成员元素，不存在的成员元素会被忽略。返回被成功移除的元素的数量，不存在的元素被忽略。
```
127.0.0.1:6379> SMEMBERS set1
1) "g"
2) "b"
3) "a"
4) "c"
5) "e"
6) "f"
7) "d"
127.0.0.1:6379> SREM a x b y
(integer) 0
127.0.0.1:6379> SREM set1 a b x y
(integer) 2
127.0.0.1:6379> SMEMBERS set1
1) "g"
2) "c"
3) "e"
4) "f"
5) "d"
```

### SPOP KEY_NAME count
移除并返回集合中的`count`个随机元素。返回被移除的元素，当集合不存在或是空集时，返回`nil`。
```
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "g"
5) "c"
127.0.0.1:6379> SPOP set1 2
1) "c"
2) "e"
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "g"
```

### SRANDMEMBER KEY_NAME count
随机从集合中返回`count`个元素。
* 如果`count`没写，默认为`1`。
* 如果`count`为正数，且小于集合的元素个数，那么返回包含`count`个元素的数组，元素各不相同。
* 如果`count`为正数，且大于等于集合的元素个数，那么返回整个集合。
* 如果`count`为负数，且绝对值小于集合元素的个数，那么返回包含`count`的绝对值个元素，且各不相同。
* 如果`count`为负数，且绝对值大于集合元素的个数，那么返回包含`count`的绝对值个元素，但是会有重复。
* 与`SPOP`不同，`SRANDMEMBER`不会移除集合中的元素，只是获取值。

```
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "g"
127.0.0.1:6379> SRANDMEMBER set1 2
1) "f"
2) "d"
127.0.0.1:6379> SRANDMEMBER set1 5
1) "f"
2) "d"
3) "g"
127.0.0.1:6379> SRANDMEMBER set1 0
(empty list or set)
127.0.0.1:6379> SRANDMEMBER set1 -2
1) "f"
2) "g"
127.0.0.1:6379> SRANDMEMBER set1 -1
1) "g"
127.0.0.1:6379> SRANDMEMBER set1 -5
1) "f"
2) "g"
3) "d"
4) "g"
5) "d"
```

### SINTER KEY_NAME [KEY_NAME ...]
返回给定所有给定集合的交集。不存在的集合被视为空集。 当给定集合当中有一个空集时，根据集合运算定律，结果也为空集。
```
127.0.0.1:6379> SADD set1 a b c d e f g
(integer) 4
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "b"
5) "g"
6) "c"
7) "a"
127.0.0.1:6379> SMEMBERS set2
(empty list or set)
127.0.0.1:6379> SINTER set1 set2
(empty list or set)
127.0.0.1:6379> SADD set2 a b c x y z
(integer) 6
127.0.0.1:6379> SINTER set1 set2
1) "b"
2) "a"
3) "c"
```

### SUNION KEY_NAME [KEY_NAME ...] 
返回所有给定集合的并集，不存在的集合视为空集。
```
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "b"
5) "g"
6) "c"
7) "a"
127.0.0.1:6379> SMEMBERS set2
1) "b"
2) "x"
3) "z"
4) "y"
5) "a"
6) "c"
127.0.0.1:6379> SUNION set1 set2
 1) "g"
 2) "a"
 3) "c"
 4) "f"
 5) "d"
 6) "y"
 7) "e"
 8) "x"
 9) "b"
10) "z"
127.0.0.1:6379> SMEMBERS set3
(empty list or set)
127.0.0.1:6379> SUNION set1 set3
1) "b"
2) "d"
3) "f"
4) "e"
5) "g"
6) "a"
7) "c"
```

### SDIFF KEY_NAME [KEY_NAME ...]
获取给定集合之间的差集，不存在的键将视为空集合。
```
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "b"
5) "g"
6) "c"
7) "a"
127.0.0.1:6379> SMEMBERS set2
1) "b"
2) "x"
3) "z"
4) "y"
5) "a"
6) "c"
127.0.0.1:6379> SDIFF set1 set2
1) "f"
2) "d"
3) "g"
4) "e"
127.0.0.1:6379> SDIFF set2 set1
1) "x"
2) "y"
3) "z"
127.0.0.1:6379> SMEMBERS set3
(empty list or set)
127.0.0.1:6379> SDIFF set1 set3
1) "b"
2) "d"
3) "f"
4) "e"
5) "g"
6) "a"
7) "c"
127.0.0.1:6379> SDIFF set3 set1
(empty list or set)
```

### SINTERSTORE DESTINATION_KEY KEY_NAME [KEY_NAME ...]
给定集合之间的交集存储在指定的集合中。如果指定的集合已经存在，则将其覆盖，返回交集成员数量。相当于先执行`SINTER`命令，然后将结果保存到指定集合`DESTINATION_KEY`中。
```
127.0.0.1:6379> SMEMBERS set2
1) "x"
2) "b"
3) "z"
4) "y"
5) "a"
6) "c"
127.0.0.1:6379> SINTER set1 set2
1) "b"
2) "a"
3) "c"
127.0.0.1:6379> SINTERSTORE set_12_inter set1 set2
(integer) 3
127.0.0.1:6379> SMEMBERS set_12_inter
1) "c"
2) "a"
3) "b"
```
如果要存储的集合以及存在：
```
127.0.0.1:6379> SADD set12 1 2 3
(integer) 3
127.0.0.1:6379> SMEMBERS set12
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> SINTERSTORE set12 set1 set2
(integer) 3
127.0.0.1:6379> SMEMBERS set12
1) "c"
2) "a"
3) "b"
```

### SUNIONSTORE DESTINATION_KEY KEY_NAME [KEY_NAME ...]
类似执行`SUNION`命令，执行完成以后将结果存储到`DESTINATION_KEY`集合中，如果`DESTINATION_KEY`已经存在，就将其覆盖。
```
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "b"
5) "g"
6) "c"
7) "a"
127.0.0.1:6379> SMEMBERS set2
1) "x"
2) "b"
3) "z"
4) "y"
5) "a"
6) "c"
127.0.0.1:6379> SUNION set1 set2
 1) "a"
 2) "c"
 3) "f"
 4) "d"
 5) "y"
 6) "g"
 7) "e"
 8) "x"
 9) "b"
10) "z"
127.0.0.1:6379> SUNIONSTORE set_12_union set1 set2
(integer) 10
127.0.0.1:6379> SMEMBERS set_12_union
 1) "a"
 2) "c"
 3) "f"
 4) "d"
 5) "y"
 6) "g"
 7) "e"
 8) "x"
 9) "b"
10) "z"
```

### SDIFFSTORE DESTINATION_KEY KEY_NAME [KEY_NAME ...]
类似执行`SDIFF`命令，执行完成以后将结果存储到`DESTINATION_KEY`集合中，如果`DESTINATION_KEY`已经存在，就将其覆盖。
```
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "b"
5) "g"
6) "c"
7) "a"
127.0.0.1:6379> SMEMBERS set2
1) "x"
2) "b"
3) "z"
4) "y"
5) "a"
6) "c"
127.0.0.1:6379> SDIFF set1 set2
1) "f"
2) "d"
3) "g"
4) "e"
127.0.0.1:6379> SDIFFSTORE set_12_diff set1 set2
(integer) 4
127.0.0.1:6379> SMEMBERS set_12_diff
1) "f"
2) "d"
3) "g"
4) "e"
127.0.0.1:6379> SDIFF set2 set1
1) "x"
2) "y"
3) "z"
127.0.0.1:6379> SDIFFSTORE set_21_diff set2 set1
(integer) 3
127.0.0.1:6379> SMEMBERS set_21_diff
1) "x"
2) "y"
3) "z"
```

### SMOVE SOURCE_KEY DESTINATION_KEY member
指定成员`member`元素从`SOURCE_KEY`集合移动到`DESTINATION_KEY`集合。
* `SMOVE`是原子性操作。
* 如果`SOURCE_KEY`集合不存在或不包含指定的`member`元素，则`SMOVE`命令不执行任何操作，仅返回`0`。否则，`member`元素从`SOURCE_KEY`集合中被移除，并添加到`DESTINATION_KEY`集合中去。
* 当`DESTINATION_KEY`集合已经包含`member`元素时，`SMOVE`命令只是简单地将`SOURCE_KEY`集合中的`member`元素删除。
* 当`SOURCE_KEY`或`DESTINATION_KEY`不是集合类型时，返回一个错误。
* 如果成员元素被成功移除，返回 1 。如果成员元素不是`SOURCE_KEY`集合的成员，并且没有任何操作对`DESTINATION_KEY`集合执行，那么返回`0`。 

```
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "b"
5) "g"
6) "c"
7) "a"
127.0.0.1:6379> SMEMBERS set2
1) "x"
2) "b"
3) "z"
4) "y"
5) "a"
6) "c"
127.0.0.1:6379> SMOVE set1 set2 g
(integer) 1
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "b"
5) "c"
6) "a"
127.0.0.1:6379> SMEMBERS set2
1) "x"
2) "b"
3) "z"
4) "y"
5) "g"
6) "a"
7) "c"
127.0.0.1:6379> SMOVE set1 set2 a
(integer) 1
127.0.0.1:6379> SMEMBERS set1
1) "d"
2) "f"
3) "e"
4) "b"
5) "c"
127.0.0.1:6379> SMEMBERS set2
1) "x"
2) "b"
3) "z"
4) "y"
5) "g"
6) "a"
7) "c"
```

### 集合命令时间复杂度
<table>
	<tr>
		<th width='10%'>操作类型</th>
		<th width='45%'>命令</th>
		<th width='45%'>复杂度</th>
	</tr>
	<tr>
		<td rowspan='7'>集合内操作</td>
		<td>SADD KEY_NAME member [member ...]</td>
		<td><i>O</i> (k)，k是元素个数</td>
	</tr>
	<tr>
		<td>SREM KEY_NAME member [member ...]</td>
		<td><i>O</i> (k)，k是元素个数</td>
	</tr>
	<tr>
		<td>SCARD KEY_NAME</td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>SISMEMBER KEY_NAME member </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>SRANDMEMBER KEY_NAME count</td>
		<td><i>O</i> (count)</td>
	</tr>
	<tr>
		<td>SPOP KEY_NAME count</td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>SMEMBERS KEY</td>
		<td><i>O</i> (n)，n是元素个数</td>
	</tr>
	<tr>
		<td rowspan='6'>集合间操作</td>
		<td>SINTER KEY_NAME [KEY_NAME ...]</td>
		<td><i>O</i> (m*k)，k是多个集合中元素最少的个数，m是键个数</td>
	</tr>
	<tr>
		<td>SINTERSTORE DESTINATION_KEY KEY_NAME [KEY_NAME ...]</td>
		<td><i>O</i> (m*k)，k是多个集合中元素最少的个数，m是键个数</td>
	</tr>
	<tr>
		<td>SUNION KEY_NAME [KEY_NAME ...] </td>
		<td><i>O</i> (k)，k是多个集合中元素个数之和</td>
	</tr>
	<tr>
		<td>SUNIONSTORE DESTINATION_KEY KEY_NAME [KEY_NAME ...]</td>
		<td><i>O</i> (k)，k是多个集合中元素个数之和</td>
	</tr>
	<tr>
		<td>SDIFF KEY_NAME [KEY_NAME ...]</td>
		<td><i>O</i> (k)，k是多个集合中元素个数之和</td>
	</tr>
	<tr>
		<td>SDIFFSTORE DESTINATION_KEY KEY_NAME [KEY_NAME ...]</td>
		<td><i>O</i> (k)，k是多个集合中元素个数之和</td>
	</tr>
</table>
