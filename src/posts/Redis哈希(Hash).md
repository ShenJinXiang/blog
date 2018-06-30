id: 64
title: Redis 哈希(Hash)
date: 2018-06-26
category: redis
tags: redis
description: hash 是一个String类型的字段(field)和值(value)的映射表，类似于JavaScript中的对象，hash特别适合用于存储对象

------
`hash` 是一个`String`类型的字段(`field`)和值(`value`)的映射表，类似于JavaScript中的对象，`hash`特别适合用于存储对象。命令也非常简单：

### HSET key field value 
将哈希表`key`中的字段`field`的值设为`value`。
```
127.0.0.1:6379> HSET student1 name xiaoming
(integer) 1
```

### HGET key field 
获取存储在哈希表中指定字段的值
```
127.0.0.1:6379> HGET student1 name
"xiaoming"
```

### HMSET key field1 value1 [field2 value2 ] 
同时将多个`field-value`(域-值)对设置到哈希表`key`中
```
127.0.0.1:6379> HMSET student1 age 18 email xiaoming@126.com 
OK
127.0.0.1:6379> HGET student1 age
"18"
127.0.0.1:6379> HGET student1 email
"xiaoming@126.com"
```

### HMGET key field1 [field2 ...]
获取所有给定字段的值
```
127.0.0.1:6379> HMGET student1 name age email
1) "xiaoming"
2) "18"
3) "xiaoming@126.com"
```

### HGETALL key 
获取在哈希表中指定`key`的所有字段和值
```
127.0.0.1:6379> HGETALL student1
1) "name"
2) "xiaoming"
3) "email"
4) "xiaoming@126.com"
5) "age"
6) "18"
```

### HLEN key 
获取哈希表中字段的数量
```
127.0.0.1:6379> HLEN student1
(integer) 3
```

### HKEYS key 
获取所有哈希表中的字段
```
127.0.0.1:6379> HKEYS student1
1) "name"
2) "email"
3) "age"
```

### HVALS key 
获取哈希表中所有值
```
127.0.0.1:6379> HVALS student1
1) "xiaoming"
2) "18"
3) "xiaoming@126.com"
```

### HEXISTS key field 
查看哈希表`key`中，指定的字段是否存在。存在返回`1`，不存在则返回`0`
```
127.0.0.1:6379> HEXISTS student1 name
(integer) 1
127.0.0.1:6379> HEXISTS student1 boold_type
(integer) 0
```

### HDEL key field2 [field2 ...] 
删除一个或多个哈希表字段
```
127.0.0.1:6379> HDEL student1 age email
(integer) 2
127.0.0.1:6379> HGETALL student1
1) "name"
2) "xiaoming"
```

### HSETNX key field value 
只有在字段`field`不存在时，设置哈希表字段的值。设置成功返回`1`，设置失败返回`0`
```
127.0.0.1:6379> HSETNX student1 name xiaohong
(integer) 0
127.0.0.1:6379> HSETNX student1 age 18
(integer) 1
127.0.0.1:6379> HGETALL student1
1) "name"
2) "xiaoming"
3) "age"
4) "18"
```

### HINCRBY key field increment 
为哈希表`key`中的指定字段的整数值加上增量`increment` 。
```
127.0.0.1:6379> HINCRBY student1 age 3
(integer) 21
127.0.0.1:6379> HGET student1 age
"21"
127.0.0.1:6379> HINCRBY student1 age -1
(integer) 20
127.0.0.1:6379> HGET student1 age
"20"
```

### HINCRBYFLOAT key field increment 
为哈希表`key`中的指定字段的浮点数值加上增量`increment` 。
```
127.0.0.1:6379> HINCRBYFLOAT student1 age 1.5
"21.5"
127.0.0.1:6379> HGET student1 age
"21.5"
127.0.0.1:6379> HINCRBYFLOAT student1 age -0.3
"21.2"
127.0.0.1:6379> HGET student1 age
"21.2"
127.0.0.1:6379> HINCRBY student1 age 4
(error) ERR hash value is not an integer
127.0.0.1:6379> HGET student1 age
"21.2"
```

### 哈希类型命令时间复杂度
<table>
	<tr>
		<th width='45%'>命令</th>
		<th witdh='55%'>复杂度</th>
	</tr>
	<tr>
		<td>HSET key field value </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>HGET key field </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>HDEL key field2 [field2 ...] </td>
		<td><i>O</i> (k) k 是 field 的个数</td>
	</tr>
	<tr>
		<td>HLEN key </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>HGETALL key </td>
		<td><i>O</i> (n) n 是 field 的个数</td>
	</tr>
	<tr>
		<td>HMGET key field1 [field2 ...]</td>
		<td><i>O</i> (k) k 是 field 的个数</td>
	</tr>
	<tr>
		<td>HEXISTS key field </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>HKEYS key </td>
		<td><i>O</i> (n) n 是 field 的个数</td>
	</tr>
	<tr>
		<td>HVALS key </td>
		<td><i>O</i> (n) n 是 field 的个数</td>
	</tr>
	<tr>
		<td>HSETNX key field value </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>HINCRBY key field increment </td>
		<td><i>O</i> (1)</td>
	</tr>
	<tr>
		<td>HINCRBYFLOAT key field increment </td>
		<td><i>O</i> (1)</td>
	</tr>
<table>
