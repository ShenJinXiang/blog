id: 65
title: Redis 列表(List)
date: 2018-06-27
category: redis
tags: redis
description: Redis 列表用来存储多个有序的字符串。列表中的每个字符串成为元素，元素从左到右组成了一个有序的、可重复的列表。

------
Redis 列表用来存储多个有序的字符串。列表中的每个字符串成为元素，元素从左到右组成了一个有序的、可重复的列表。

### RPUSH key value1 [value2 ...] 
用于将一个或多个值插入到列表的尾部(最右边)。如果列表不存在，一个空列表会被创建并执行`RPUSH`操作。 当列表存在但不是列表类型时，返回一个错误。
返回添加元素后列表的长度。
```
127.0.0.1:6379> RPUSH cities BeiJing ShangHai
(integer) 2
127.0.0.1:6379> RPUSH cities TianJin DaLian
(integer) 4
```

### LRANGE key start stop 
获取列表中指定区间内的元素，区间以偏移量`START`和`END`指定。 其中`0`表示列表的第一个元素， `1`表示列表的第二个元素，以此类推。也可以使用负数下标，以`-1`表示列表的最后一个元素，`-2`表示列表的倒数第二个元素，以此类推
```
127.0.0.1:6379> LRANGE cities 0 -1
1) "BeiJing"
2) "ShangHai"
3) "TianJin"
4) "DaLian"
127.0.0.1:6379> LRANGE cities 1 -2
1) "ShangHai"
2) "TianJin"
127.0.0.1:6379> LRANGE cities 1 3
1) "ShangHai"
2) "TianJin"
3) "DaLian"
```

### LLEN key 
返回列表的长度。如果列表`key`不存在，则`key`被解释为一个空列表，返回`0` 。 如果`key`不是列表类型，返回一个错误。
```
127.0.0.1:6379> LLEN cities
(integer) 4
127.0.0.1:6379> RPUSH cities HangZhou
(integer) 5
127.0.0.1:6379> LLEN cities
(integer) 5
```

### LPUSH key value1 [value2 ..] 
将一个或多个值插入到列表头部。如果`key`不存在，一个空列表会被创建并执行`LPUSH`操作。 当`key`存在但不是列表类型时，返回一个错误。
返回执行`LPUSH`命令后，列表的长度。
```
127.0.0.1:6379> LRANGE cities 0 -1
1) "BeiJing"
2) "ShangHai"
3) "TianJin"
4) "DaLian"
5) "HangZhou"
127.0.0.1:6379> LPUSH cities TaiYuan 
(integer) 6
127.0.0.1:6379> LRANGE cities 0 -1
1) "TaiYuan"
2) "BeiJing"
3) "ShangHai"
4) "TianJin"
5) "DaLian"
6) "HangZhou"
127.0.0.1:6379> LPUSH cities XiAn KunMing
(integer) 8
127.0.0.1:6379> LRANGE cities 0 -1
1) "KunMing"
2) "XiAn"
3) "TaiYuan"
4) "BeiJing"
5) "ShangHai"
6) "TianJin"
7) "DaLian"
8) "HangZhou"
```

### RPOP key 
移除并获取列表最右边的元素，即最后一个元素。当`key`不存在时，返回`nil`。
```
127.0.0.1:6379> RPOP cities
"HangZhou"
127.0.0.1:6379> LRANGE cities 0 -1
1) "KunMing"
2) "XiAn"
3) "TaiYuan"
4) "BeiJing"
5) "ShangHai"
6) "TianJin"
7) "DaLian"
127.0.0.1:6379> RPOP cities
"DaLian"
127.0.0.1:6379> LRANGE cities 0 -1
1) "KunMing"
2) "XiAn"
3) "TaiYuan"
4) "BeiJing"
5) "ShangHai"
6) "TianJin"
```

### LPOP key 
移出并获取列表的第一个元素。当`key`不存在时，返回`nil`。
```
127.0.0.1:6379> LPOP cities 
"KunMing"
127.0.0.1:6379> LRANGE cities 0 -1
1) "XiAn"
2) "TaiYuan"
3) "BeiJing"
4) "ShangHai"
5) "TianJin"
127.0.0.1:6379> LPOP cities 
"XiAn"
127.0.0.1:6379> LRANGE cities 0 -1
1) "TaiYuan"
2) "BeiJing"
3) "ShangHai"
4) "TianJin"
```

### LINDEX key index 
用于通过索引获取列表中的元素。也可以使用负数下标，以`-1`表示列表的最后一个元素，`-2`表示列表的倒数第二个元素，以此类推。
返回列表中下标为指定索引值的元素。如果指定索引值不在列表的区间范围内，返回`nil`。
```
127.0.0.1:6379> LINDEX cities 0
"TaiYuan"
127.0.0.1:6379> LINDEX cities 1
"BeiJing"
127.0.0.1:6379> LINDEX cities -1
"TianJin"
```

### LSET key index value 
通过索引设置列表元素的值，当索引参数超出范围，或对一个空列表进行`LSET`时，返回一个错误。操作成功返回`ok`。
```
127.0.0.1:6379> LRANGE cities 0 -1
1) "TaiYuan"
2) "BeiJing"
3) "ShangHai"
4) "TianJin"
127.0.0.1:6379> LSET cities 1 ChengDu
OK
127.0.0.1:6379> LRANGE cities 0 -1
1) "TaiYuan"
2) "ChengDu"
3) "ShangHai"
4) "TianJin"
127.0.0.1:6379> LSET cities 5 JiNan
(error) ERR index out of range
```

### RPUSHX key value 
为已存在的列表添加值，类似`RPUSH`命令，但是`key`必须存在。命令执行完成后返回列表长度。
```
127.0.0.1:6379> RPUSHX cities BeiJing
(integer) 5
127.0.0.1:6379> LRANGE cities 0 -1
1) "TaiYuan"
2) "ChengDu"
3) "ShangHai"
4) "TianJin"
5) "BeiJing"
127.0.0.1:6379> type cities1
none
127.0.0.1:6379> RPUSHX cities1 BeiJing
(integer) 0
127.0.0.1:6379> LRANGE cities1 0 -1
(empty list or set)
```

### LPUSHX key value 
将一个或多个值插入到已存在的列表头部，类似`LPUSH`，但是`key`必须存在。命令执行完成后返回列表长度。
```
127.0.0.1:6379> LRANGE cities 0 -1
1) "TaiYuan"
2) "ChengDu"
3) "ShangHai"
4) "TianJin"
5) "BeiJing"
127.0.0.1:6379> LPUSHX cities ChangChun
(integer) 6
127.0.0.1:6379> LRANGE cities 0 -1
1) "ChangChun"
2) "TaiYuan"
3) "ChengDu"
4) "ShangHai"
5) "TianJin"
6) "BeiJing"
```

### LINSERT key BEFORE|AFTER pivot value 
用于在列表的元素前或者后插入元素。当指定元素不存在于列表中时，不执行任何操作。当列表不存在时，被视为空列表，不执行任何操作。
如果命令执行成功，返回插入操作完成之后，列表的长度。如果没有找到指定元素，返回`-1`。 如果 key 不存在或为空列表，返回`0`。 
```
127.0.0.1:6379> LINSERT cities BEFORE ShangHai ShiJiaZhuang
(integer) 7
127.0.0.1:6379> LRANGE cities 0 -1
1) "ChangChun"
2) "TaiYuan"
3) "ChengDu"
4) "ShiJiaZhuang"
5) "ShangHai"
6) "TianJin"
7) "BeiJing"
```

### LREM key count value 
移除列表元素，从列表中找到等于`value`的元素，根据`count`不同删除元素，返回被移除元素的数量，列表不存在时返回`0`。
* count 大于 0 : 从左到右，删除最多`count`个值是`value`的元素
* count 小于 0 : 从右到左，删除最多`count`个值是`value`的元素
* count 等于 0 : 删除所有值是`value`的元素

```
127.0.0.1:6379> rpush list a a a a a java a a a a a
(integer) 11
127.0.0.1:6379> lrange list 0 -1
 1) "a"
 2) "a"
 3) "a"
 4) "a"
 5) "a"
 6) "java"
 7) "a"
 8) "a"
 9) "a"
10) "a"
11) "a"
127.0.0.1:6379> lrem list 2 a
(integer) 2
127.0.0.1:6379> lrange list 0 -1
1) "a"
2) "a"
3) "a"
4) "java"
5) "a"
6) "a"
7) "a"
8) "a"
9) "a"
127.0.0.1:6379> lrem list -3 a
(integer) 3
127.0.0.1:6379> lrange list 0 -1
1) "a"
2) "a"
3) "a"
4) "java"
5) "a"
6) "a"
127.0.0.1:6379> lrem list 0 a
(integer) 5
127.0.0.1:6379> lrange list 0 -1
1) "java"
127.0.0.1:6379> lrem list 5 a
(integer) 0
```

### LTRIM key start stop 
对一个列表进行修剪(`trim`)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。执行成功时，返回`OK`。
```
127.0.0.1:6379> rpush list a b c d e f g h i j
(integer) 10
127.0.0.1:6379> lrange list 0 -1
 1) "a"
 2) "b"
 3) "c"
 4) "d"
 5) "e"
 6) "f"
 7) "g"
 8) "h"
 9) "i"
10) "j"
127.0.0.1:6379> ltrim list 1 -2
OK
127.0.0.1:6379> lrange list 0 -1
1) "b"
2) "c"
3) "d"
4) "e"
5) "f"
6) "g"
7) "h"
8) "i"
127.0.0.1:6379> ltrim list -1 1
OK
127.0.0.1:6379> lrange list 0 -1
(empty list or set)
```
如果要清空列表中的元素，可以设置`start`的位置在`stop`位置的右侧，所有元素都不在指定区间内，即可清空列表。

### RPOPLPUSH source destination 
移除列表的最后一个元素，并将该元素添加到另一个列表并返回
```
127.0.0.1:6379> rpush list1 1 2 3 4 5 
(integer) 5
127.0.0.1:6379> rpush list2 a b c d e
(integer) 5
127.0.0.1:6379> lrange list1 0 -1
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
127.0.0.1:6379> lrange list2 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
127.0.0.1:6379> rpoplpush list1 list2
"5"
127.0.0.1:6379> lrange list1 0 -1
1) "1"
2) "2"
3) "3"
4) "4"
127.0.0.1:6379> lrange list2 0 -1
1) "5"
2) "a"
3) "b"
4) "c"
5) "d"
6) "e"
```

### 阻塞操作
列表中涉及到阻塞操作的有三个命令：

> BLPOP key1 [key2 ...] timeout 

对应`LPOP`的阻塞操作，移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止

> BRPOP key1 [key2 ...] timeout 

对应`RPOP`的阻塞操作，移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

> BRPOPLPUSH source destination timeout 

对应`RPOPLPUSH`的阻塞操作，从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

这些命令对于列表中有元素的情况和非阻塞的时候没区别，以`BLPOP`为例：
```
127.0.0.1:6379> lrange list 0 -1
(empty list or set)
127.0.0.1:6379> rpush list a b c
(integer) 3
127.0.0.1:6379> lrange list 0 -1
1) "a"
2) "b"
3) "c"
127.0.0.1:6379> blpop list 3
1) "list"
2) "a"
127.0.0.1:6379> lrange list 0 -1
1) "b"
2) "c"
```

对于列表为空的情况：
* 执行命令以后会进入等待状态，等待最长时间为`timeout`，单位为秒。
* 如果`timeout`设定为`0`，会一直阻塞下去。
* 在`timeout`时间范围内，只要有其他客户端给列表中添加了元素，立即返回结果。
* 对于`BLPOP`和`BRPOP`可以设置多个键，Redis会从左到右遍历键，一旦有一个键能弹出元素，客户端立即返回。
* 如果多个客户端对同一个键执行`BLPOP`，那么先执行`BLPOP`命令的客户端可以获取到弹出的值，`BRPOP`同样如此。

### 列表命令时间复杂度
<table>
	<tr>
		<th width='10%'>操作类型</th>
		<th width='45%'>命令</th>
		<th width='45%'>复杂度</th>
	</tr>
	<tr>
		<td rowspan='3'>添加</td>
		<td>RPUSH key value1 [value2 ...] </td>
		<td><i>O</i> (k)，k 是元素个数</td>
	</tr>
	<tr>
		<td>LPUSH key value1 [value2 ...] </td>
		<td><i>O</i> (k)，k 是元素个数</td>
	</tr>
	<tr>
		<td>LINSERT key BEFORE|AFTER pivot value </td>
		<td><i>O</i> (n)，n 是pivot 距离列表头或者尾的距离</td>
	</tr>
	<tr>
		<td rowspan='3'>查找</td>
		<td>LRANGE key start stop </td>
		<td><i>O</i> (s+n)，s是start偏移量，n是start到stop的范围</td>
	</tr>
	<tr>
		<td>LINDEX key index </td>
		<td><i>O</i> (n)，n是索引的偏移量</td>
	</tr>
	<tr>
		<td>LLEN key </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td rowspan='4'>删除</td>
		<td>LPOP key </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>RPOP key </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>LREM key count value </td>
		<td><i>O</i> (n)，n是列表长度</td>
	</tr>
	<tr>
		<td>LTRIM key start stop </td>
		<td><i>O</i> (n)，n是要裁剪的元素个数</td>
	</tr>
	<tr>
		<td>修改</td>
		<td>LSET key index value </td>
		<td><i>O</i> (n)，n索引的偏移量</td>
	</tr>
	<tr>
		<td rowspan='2'>阻塞操作</td>
		<td>BLPOP key1 [key2 ...] timeout </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>BRPOP key1 [key2 ...] timeout </td>
		<td><i>O</i> (1)</td>
	</tr>
</table>
