id: 62
title: Redis 命令
date: 2018-06-22
category: redis
tags: redis
description: Redis 提供了5中数据结构：字符串(String)、哈希(Hash)、列表(List)、集合(Set) 和有序集合(sorted Set)，详细了解这些数据类型之前，大致了解一些全局性的命令。

------
Redis 提供了`5`中数据结构：字符串(`String`)、哈希(`Hash`)、列表(`List`)、集合(`Set`) 和有序集合(`sorted Set`)，详细了解这些数据类型之前，大致了解一些全局性的命令。
**注意：Redis的命令不区分大小写，但是键`key`严格区分大小写！！！**

### PING
通过客户端向 Redis 服务器发送一个`PING`，如果服务器运作正常的话，会返回一个`PONG`。通常用于测试与服务器的连接是否仍然生效，或者用于测量延迟值
```
127.0.0.1:6379> PING
PONG
```

### ECHO message
用于打印给定的字符串，返回字符串本身。
```
127.0.0.1:6379> ECHO Hello
"Hello"
127.0.0.1:6379> ECHO ShenJinXiang
"ShenJinXiang"
```

### AUTH PASSWORD 
用于检测给定的密码和配置文件中的密码是否相符，如果检测成功返回`OK`，否则返回错误。
```
127.0.0.1:6379> AUTH password
(error) ERR Client sent AUTH, but no password is set
127.0.0.1:6379> CONFIG set requirepass mypassword
OK
127.0.0.1:6379> AUTH mypassword
OK
```
这里开始用`password`这个字符串来验证密码是否正确，返回错误信息，因为默认的配置中没有设置密码的。然后通过`CONFIG`命令设置密码为`mypassword`，再次验证返回`OK`。

### SELECT index
Redis中有若干个数据库，数据库的数量在配置文件`redis.conf`中通过`databases`设置数据库数量，每个数据库都有索引，从`0`开始至`databases - 1`，默认使用的是索引为`0`的数据库，可以通过`SELECT`切换数据库，参数`index`为数据库的索引。如果切换成功返回`OK`，如果输入的索引`index`不在范围内，则无法切换，返回错误信息。

```
127.0.0.1:6379> get name
"ShenJinXiang"
127.0.0.1:6379> select 1
OK
127.0.0.1:6379[1]> get name
(nil)
127.0.0.1:6379[1]> set name ShenJinXiang1
OK
127.0.0.1:6379[1]> get name
"ShenJinXiang1"
127.0.0.1:6379[1]> select 3
OK
127.0.0.1:6379[3]> get name
(nil)
127.0.0.1:6379[3]> select 16
(error) ERR DB index is out of range
127.0.0.1:6379[3]> select 0
OK
127.0.0.1:6379> get name
"ShenJinXiang"
```
可以看到，切换数据库以后，再次获取`name`的值，返回`nil`，表示当前库中没有`name`这个键。同时切换成功以后提示符也会有变化。

### QUIT 
关闭当前客户端与 Redis 服务的连接，总是返回`OK`

### KEYS pattern 
查找所有符合给定模式`pattern`的键`key`。

先设置一些数据：
```
127.0.0.1:6379> set name1 LiuBei
OK
127.0.0.1:6379> set name2 ZhouYu
OK
127.0.0.1:6379> set name3 LiShiMin
OK
127.0.0.1:6379> set age1 12
OK
127.0.0.1:6379> set age2 22
OK
127.0.0.1:6379> set age3 33
OK
127.0.0.1:6379> set name ShenJinXiang
OK
127.0.0.1:6379> set yourname ZhangSan
OK
```

获取以`name`开头的键：
```
127.0.0.1:6379> keys name*
1) "name1"
2) "name3"
3) "name"
4) "name2"
```

获取以`age`开头的键：
```
127.0.0.1:6379> keys age*
1) "age2"
2) "age3"
3) "age1"
```

获取包含`name`的键：
```
127.0.0.1:6379> keys *name*
1) "name1"
2) "name3"
3) "name"
4) "yourname"
5) "name2"
```

获取Redis中所有的键：
```
127.0.0.1:6379> keys *
1) "name1"
2) "name3"
3) "name"
4) "age2"
5) "age3"
6) "age1"
7) "yourname"
8) "name2"
```

### DEL KEY_NAME
用于删除已存在的键。不存在的 key 会被忽略，返回被删除的键的数量。
```
127.0.0.1:6379> keys *
1) "age1"
2) "age2"
3) "yourname"
4) "name1"
5) "name2"
6) "age3"
7) "name3"
8) "name"
127.0.0.1:6379> del name
(integer) 1
127.0.0.1:6379> keys *
1) "age1"
2) "age2"
3) "yourname"
4) "name1"
5) "name2"
6) "age3"
7) "name3"
127.0.0.1:6379> del age1 age2 age3
(integer) 3
127.0.0.1:6379> keys *
1) "yourname"
2) "name1"
3) "name2"
4) "name3"
```

### DBSIZE
`DBSIZE` 命令没有参数，返回当前数据库中键的总数量。
```
127.0.0.1:6379> dbsize
(integer) 4
127.0.0.1:6379> del abc
(integer) 0
127.0.0.1:6379> dbsize
(integer) 4
127.0.0.1:6379> del yourname
(integer) 1
127.0.0.1:6379> dbsize
(integer) 3
```
`dbsize`命令在计算键总数时不会遍历所有键，而是直接获取 Redis 内置的键总数变量。所以`dbsize`命令的时间复杂度是`O (1)`。而`keys` 命令会遍历所有键，它的时间复杂度是`O (n)`，当 Redis 保存了大量键时，线上环境禁止使用。

### EXISTS KEY_NAME
检查给定的键（`KEY_NAME`）是否存在，存在返回`1`，不存在返回`0`。
```
127.0.0.1:6379> keys *
1) "name1"
2) "name2"
3) "name3"
127.0.0.1:6379> exists name
(integer) 0
127.0.0.1:6379> exists name1
(integer) 1
127.0.0.1:6379> exists name1 name2 
(integer) 2
127.0.0.1:6379> exists name name1 name2
(integer) 2
```
可以看到，检测一个键是否存在的时候，存在返回`1`，不存在返回`0`。也可以检测多个键是否存在，返回存在的键的数量。

### RENAME OLD_KEY_NAME NEW_KEY_NAME
重命名键名称，成功返回`OK`，失败返回错误信息。

```
127.0.0.1:6379> keys *
1) "name1"
2) "name2"
3) "name3"
127.0.0.1:6379> get name1
"LiuBei"
127.0.0.1:6379> rename name1 name4
OK
127.0.0.1:6379> keys *
1) "name2"
2) "name3"
3) "name4"
127.0.0.1:6379> get name4
"LiuBei"
```
当`OLD_KEY_NAME`不存在时，返回一个错误信息。
```
127.0.0.1:6379> rename name1 name4
(error) ERR no such key
```
当`NEW_KEY_NAME`存在，则会覆盖旧值。
```
127.0.0.1:6379> get name2
"ZhouYu"
127.0.0.1:6379> get name3
"LiShiMin"
127.0.0.1:6379> rename name2 name3
OK
127.0.0.1:6379> keys *
1) "name3"
2) "name4"
127.0.0.1:6379> get name3
"ZhouYu"
```

### RENAMENX OLD_KEY_NAME NEW_KEY_NAME
类似于`RENAME`命令，区别在于如果`NEW_KEY_NAME`已存在，修改不成功，返回`0`。
```
127.0.0.1:6379> keys *
1) "name3"
2) "name4"
127.0.0.1:6379> EXISTS name1
(integer) 0
127.0.0.1:6379> renamenx name3 name1
(integer) 1
127.0.0.1:6379> keys *
1) "name1"
2) "name4"
```
如果`NEW_KEY_NAME`已经存在：
```
127.0.0.1:6379> get name1
"ZhouYu"
127.0.0.1:6379> get name4
"LiuBei"
127.0.0.1:6379> renamenx name1 name4
(integer) 0
127.0.0.1:6379> get name1
"ZhouYu"
127.0.0.1:6379> get name4
"LiuBei"
```

### MOVE KEY_NAME DESTINATION_DATABASE
将当前数据库的`key`移动到给定的数据库`db`当中
```
127.0.0.1:6379> keys *
1) "name1"
2) "name4"
127.0.0.1:6379> select 1
OK
127.0.0.1:6379[1]> keys *
1) "name"
127.0.0.1:6379[1]> move name 0
(integer) 1
127.0.0.1:6379[1]> keys *
(empty list or set)
127.0.0.1:6379[1]> select 0
OK
127.0.0.1:6379> keys *
1) "name1"
2) "name"
3) "name4"
127.0.0.1:6379> get name
"ShenJinXiang1"
```

### TYPE KEY_NAME 
查询键(`KEY_NAME`)所存储的值的数据类型，数据类型有：
* none (key不存在)
* string (字符串)
* list (列表)
* set (集合)
* zset (有序集)
* hash (哈希表)

### 键过期时间相关
* EXPIRE - 设置键的剩余过期时间，单位为秒
* EXPIREAT - 以 UNIX 时间戳(unix timestamp)格式设置键的过期时间。过期后将不再可用
* PEXPIREAT - 设置键的剩余过期时间，单位为毫秒
* PERSIST - 移除给定键的过期时间，使得键永不过期
* PTTL - 查询键剩余的过期时间，单位为毫秒
* TTL - 查询键剩余的过期时间，单位为秒

