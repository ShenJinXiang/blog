id: 64
title: Redis 列表(List)
date: 2018-06-27
category: redis
tags: redis
description: Redis 列表是简单的字符串列表，按照插入顺序排序，可以执行从列表的头部或者尾部插入或删除元素等操作。

------
Redis 列表是简单的**字符串**列表，按照插入顺序排序，可以执行从列表的头部或者尾部插入或删除元素等操作。

### RPUSH key value1 [value2] 
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

### LPUSH key value1 [value2] 
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

### BLPOP key1 [key2 ] timeout 
移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止

### BRPOP key1 [key2 ] timeout 
移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

### BRPOPLPUSH source destination timeout 
从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

### LREM key count value 
移除列表元素

### LTRIM key start stop 
对一个列表进行修剪(`trim`)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。

### RPOPLPUSH source destination 
移除列表的最后一个元素，并将该元素添加到另一个列表并返回

