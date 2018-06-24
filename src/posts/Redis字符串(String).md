id: 62
title: Redis 字符串(String)
date: 2018-06-24
category: redis
tags: redis
description: String 是 Redis 的最基本的数据类型，一个key对应一个value。

------


`String` 是 Redis 的最基本的数据类型，一个`key`对应一个`value`。`String`类型是二进制安全的，意思是 Redis 的`String`可以包含任何数据，比如图片或者序列化的对象，一个Redis中字符串`value`最多可以是`512M`。

**注意：Redis的命令不区分大小写，但是`key`严格区分大小写！！！**

### SET key value 

设置指定`key`的值为`value`，设置成功返回`ok`。

设置`name`的值为`shenjinxiang`:
```
127.0.0.1:6379> SET name shenjinxiang
OK
```

### GET key

获取指定`key`的值

获取`name`的值：
```
127.0.0.1:6379> GET name
"shenjinxiang"
```

### GETSET key value 

将给定`key`的值设为`value` ，并返回`key`的旧值(`old value`)。

```
127.0.0.1:6379> GETSET name ShenJinXiang
"shenjinxiang"
127.0.0.1:6379> GET name
"ShenJinXiang"
```

设置不存在的`key`:
```
127.0.0.1:6379> GETSET address TaiYuan
(nil)
127.0.0.1:6379> GET address
"TaiYuan"
```

### MSET key value [key value ...] 

同时设置一个或多个`key-value`对。
```
127.0.0.1:6379> MSET email sjx-sword@163.com blood_type o
OK
127.0.0.1:6379> GET email
"sjx-sword@163.com"
127.0.0.1:6379> GET blood_type
"o"
```

### MGET key1 [key2..] 

获取所有(一个或多个)给定`key`的值。
```
127.0.0.1:6379> MGET name email address blood_type
1) "ShenJinXiang"
2) "sjx-sword@163.com"
3) "TaiYuan"
4) "o"
```

### SETNX key value 

只有在`key`不存在时设置`key`的值。
```
127.0.0.1:6379> SETNX name liubei
(integer) 0
127.0.0.1:6379> GET name
"ShenJinXiang"
```

### MSETNX key value [key value ...] 

同时设置一个或多个`key-value`对，当且仅当所有给定`key`都不存在时生效。
```
127.0.0.1:6379> MSETNX name liubei num1 1 num2 1 email sjx@126.com
(integer) 0
127.0.0.1:6379> MGET name num1 num2 email
1) "ShenJinXiang"
2) (nil)
3) (nil)
4) "sjx-sword@163.com"
```

### SETEX key seconds value 

将值`value`关联到`key`，并将`key`的过期时间设为`seconds` (以秒为单位)。
```
127.0.0.1:6379> SETEX num 10 100
OK
127.0.0.1:6379> GET num
"100"
127.0.0.1:6379> GET num
(nil)
```
这里设置`num`的值为`100`，有效期为`10`秒，第二次执行`GET num`是等了一段时间以后执行的结果。

### PSETEX key milliseconds value 

和`SETEX`命令相似，但以毫秒为单位设置`key`的生存时间，而不是像`SETEX`命令那样，以秒为单位。

### STRLEN key 

返回`key`所储存的字符串值的长度。
```
127.0.0.1:6379> MGET name email blood_type
1) "ShenJinXiang"
2) "sjx-sword@163.com"
3) "o"
127.0.0.1:6379> STRLEN name
(integer) 12
127.0.0.1:6379> STRLEN email
(integer) 17
127.0.0.1:6379> STRLEN blood_type
(integer) 1
```

### APPEND key value 

如果`key`已经存在并且是一个字符串， `APPEND`命令将`value`追加到`key`原来的值的末尾。
```
127.0.0.1:6379> set letter abcd
OK
127.0.0.1:6379> get letter
"abcd"
127.0.0.1:6379> append letter efg
(integer) 7
127.0.0.1:6379> get letter
"abcdefg"
```

如果`key`不存在：
```
127.0.0.1:6379> get country
(nil)
127.0.0.1:6379> append country zhongguo
(integer) 8
127.0.0.1:6379> get country
"zhongguo"
```

### GETRANGE key start end 

返回`key`中字符串值的子字符

```
127.0.0.1:6379> GETRANGE name 0 3
"shen"
127.0.0.1:6379> GETRANGE name 4 6
"jin"
127.0.0.1:6379> GETRANGE name 7 -1
"xiang"
```
