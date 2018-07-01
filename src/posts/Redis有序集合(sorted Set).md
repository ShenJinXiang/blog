id: 67
title: Redis 有序集合(sorted Set)
date: 2018-07-01
category: redis
tags: redis
description: 有序集合(sorted Set)和集合一样也是字符串类型元素的集合，且不允许重复元素。不同的是每个元素都会关联一个double类型的分数。Redis 正是通过分数来为集合中的成员进行从小到大的排序。

------
有序集合(sorted Set)和集合一样也是字符串类型元素的集合，且不允许重复元素。不同的是每个元素都会关联一个`double`类型的分数。Redis 正是通过分数来为集合中的成员进行从小到大的排序。有序集合的元素是唯一的,但分数(`score`)却可以重复。集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是`O(1)`。

### 列表、集合、有序集合的特点：
<table>
	<tr>
		<th>数据结构</th>
		<th>是否允许重复元素</th>
		<th>是否有序</th>
		<th>有序实现方式</th>
		<th>应用场景</th>
	</tr>
	<tr>
		<td>列表</td>
		<td style='text-align: center;'>是</td>
		<td style='text-align: center;'>是</td>
		<td style='text-align: center;'>索引</td>
		<td>时间轴、消息队列等</td>
	</tr>
	<tr>
		<td>集合</td>
		<td style='text-align: center;'>否</td>
		<td style='text-align: center;'>是</td>
		<td style='text-align: center;'>无</td>
		<td>标签、社交等</td>
	</tr>
	<tr>
		<td>有序集合</td>
		<td style='text-align: center;'>否</td>
		<td style='text-align: center;'>是</td>
		<td style='text-align: center;'>分值</td>
		<td>排行榜系统、社交等</td>
	</tr>
</table>

### ZADD KEY_NAME score member [score member ...]
将一个或多个成员元素及其分数值加入到有序集当中。
* 如果某个成员已经是有序集的成员，那么更新这个成员的分数值，并通过重新插入这个成员元素，来保证该成员在正确的位置上。 
* 分数值可以是整数值或双精度浮点数。
* 如果有序集合`KEY_NAME`不存在，则创建一个空的有序集并执行`ZADD`操作。
* 当`KEY_NAME`存在但不是有序集类型时，返回一个错误。

返回被成功添加的新成员的数量，不包括那些被更新的、已经存在的成员。
```
127.0.0.1:6379> ZADD zset1 1 beijing 24 tianjin 35 shanghai
(integer) 3
127.0.0.1:6379> ZADD zset1 45 chongqing
(integer) 1
```

### ZCARD KEY_NAME
获取集合中元素的数量，当键不存在时返回`0`。
```
127.0.0.1:6379> ZCARD zset1
(integer) 4
127.0.0.1:6379> ZADD zset1 56 kunming
(integer) 1
127.0.0.1:6379> ZCARD zset1
(integer) 5
```

### ZSCORE KEY_NAME member
返回有序集中成员`member`的分数值。如果成员元素不是有序集，或键不存在，返回`nil`。
```
127.0.0.1:6379> ZSCORE zset1 beijing
"1"
127.0.0.1:6379> ZSCORE zset1 tianjin
"24"
127.0.0.1:6379> ZSCORE zset1 shanghai
"35"
127.0.0.1:6379> ZSCORE zset1 chongqing
"45"
127.0.0.1:6379> ZSCORE zset1 kunming
"56"
127.0.0.1:6379> ZSCORE zset1 changchun
(nil)
```

### ZRANK KEY_NAME member
返回`member`元素在有序集合中按分值从小到大的排名，排名从`0`开始计算。如果`member`不是有序集合中的成员，返回`nil`。
```
127.0.0.1:6379> ZRANK zset1 beijing
(integer) 0
127.0.0.1:6379> ZRANK zset1 tianjin
(integer) 1
127.0.0.1:6379> ZRANK zset1 shanghai
(integer) 2
127.0.0.1:6379> ZRANK zset1 chongqing
(integer) 3
127.0.0.1:6379> ZRANK zset1 kunming
(integer) 4
127.0.0.1:6379> ZRANK zset1 changchun
(nil)
```

### ZREVRANK KEY_NAME member
`ZRANK`是按分值从小到大排名，`ZREVRANK`则相反：
```
127.0.0.1:6379> ZREVRANK zset1 beijing
(integer) 4
127.0.0.1:6379> ZREVRANK zset1 tianjin
(integer) 3
127.0.0.1:6379> ZREVRANK zset1 shanghai
(integer) 2
127.0.0.1:6379> ZREVRANK zset1 chongqing
(integer) 1
127.0.0.1:6379> ZREVRANK zset1 kunming
(integer) 0
127.0.0.1:6379> ZREVRANK zset1 changchun
(nil)
```

### ZRANGE KEY_NAME start stop [WITHSCORES]
返回指定排名范围内的成员，对于排名值，从`0`开始计数，类似列表中的索引，同样可以用`-1`表示排名最后的成员。
```
127.0.0.1:6379> ZRANGE zset1 0 -1
1) "beijing"
2) "tianjin"
3) "shanghai"
4) "chongqing"
5) "kunming"
127.0.0.1:6379> ZRANGE zset1 0 -2
1) "beijing"
2) "tianjin"
3) "shanghai"
4) "chongqing"
```
可以添加`withscore`参数，同时获取到每个成员的分值信息：
```
127.0.0.1:6379> ZRANGE zset1 0 -1 WITHSCORES
 1) "beijing"
 2) "1"
 3) "tianjin"
 4) "24"
 5) "shanghai"
 6) "35"
 7) "chongqing"
 8) "45"
 9) "kunming"
10) "56"
```

### ZREVRANGE KEY_NAME start stop [WITHSCORES]
类似`ZRANK`与`ZREVRANK`的关系，`ZREVRANGE`对于`ZRANGE`是也这样的，`ZRANGE`是按分值从小到大排名，确定位置。`ZREVRANGE`是按分值从大到小排名。
```
127.0.0.1:6379> ZRANGE zset1 0 -1
1) "beijing"
2) "tianjin"
3) "shanghai"
4) "chongqing"
5) "kunming"
127.0.0.1:6379> ZREVRANGE zset1 0 -1
1) "kunming"
2) "chongqing"
3) "shanghai"
4) "tianjin"
5) "beijing"
127.0.0.1:6379> ZRANGE zset1 0 -1 WITHSCORES
 1) "beijing"
 2) "1"
 3) "tianjin"
 4) "24"
 5) "shanghai"
 6) "35"
 7) "chongqing"
 8) "45"
 9) "kunming"
10) "56"
127.0.0.1:6379> ZREVRANGE zset1 0 -1 WITHSCORES
 1) "kunming"
 2) "56"
 3) "chongqing"
 4) "45"
 5) "shanghai"
 6) "35"
 7) "tianjin"
 8) "24"
 9) "beijing"
10) "1"
```

### ZREM KEY_NAME member [member ...]
移除有序集合中的一个或多个成员，返回被移除成员的数量，不包括被忽略的成员。
```
127.0.0.1:6379> ZRANGE zset1 0 -1
1) "beijing"
2) "tianjin"
3) "shanghai"
4) "chongqing"
5) "kunming"
127.0.0.1:6379> ZREM zset1 chongqing
(integer) 1
127.0.0.1:6379> ZREM zset1 changchun
(integer) 0
127.0.0.1:6379> ZRANGE zset1 0 -1 withscores
1) "beijing"
2) "1"
3) "tianjin"
4) "24"
5) "shanghai"
6) "35"
7) "kunming"
8) "56"
```

### ZINCRBY KEY_NAME increment memeber
对有序集合中指定成员的分值加上增量`increment`
* 可以通过传递一个负数值`increment`，让分数减去相应的值，比如`ZINCRBY key -5 member`，就是让`member`的`score`值减去`5`。
* 当键不存在，或不是有序集合的成员时， `ZINCRBY key increment member`等同于`ZADD key increment member`。
* 当键不是有序集类型时，返回一个错误。
* 分数值可以是整数值或双精度浮点数。

返回`member`成员的新分数值，以字符串形式表示
```
127.0.0.1:6379> ZRANGE zset1 0 -1 withscores
1) "beijing"
2) "1"
3) "tianjin"
4) "24"
5) "shanghai"
6) "35"
7) "kunming"
8) "56"
127.0.0.1:6379> ZINCRBY zset1 8 kunming
"64"
127.0.0.1:6379> ZRANGE zset1 0 -1 withscores
1) "beijing"
2) "1"
3) "tianjin"
4) "24"
5) "shanghai"
6) "35"
7) "kunming"
8) "64"
127.0.0.1:6379> ZINCRBY zset1 -4 shanghai
"31"
127.0.0.1:6379> ZRANGE zset1 0 -1 withscores
1) "beijing"
2) "1"
3) "tianjin"
4) "24"
5) "shanghai"
6) "31"
7) "kunming"
8) "64"
```

### ZRANGEBYSCORE KEY_NAME min max [WITHSCORES] [limit offset count]
