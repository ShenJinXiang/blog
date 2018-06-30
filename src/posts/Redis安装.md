id: 60
title: Redis 安装
date: 2018-06-20
category: redis
tags: redis
description: Redis 是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库。这里开始对redis进行一些总结。

------

Redis是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库。这里开始对redis进行一些总结。

### 优势
* 性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s 
* 丰富的数据类型 – Redis支持二进制案例的 `Strings`, `Lists`, `Hashes`, `Sets` 及 `Ordered Sets` 数据类型操作
* 原子 – Redis的所有操作都是原子性的，同时Redis还支持对几个操作全并后的原子性执行
* 丰富的特性 – Redis还支持 publish/subscribe, 通知, key 过期等等特性

### 安装
访问Redis官网，下载最新版安装包，目前是`redis-4.0.9.tar.gz`，解压文件
```
$ tar -zxf redis-4.0.9.tar.gz
```

编译安装
```
$ cd redis-4.0.9
$ make 
```
编译完成之后，还需要输入`make install`进行构建，会生成Redis的5个二进制文件，指定生成的文件位置：
```
$ make PREFIX=/usr/local/redis install
$ cd /usr/local/redis/bin
$ ls
redis-benchmark redis-check-rdb redis-sentinel
redis-check-aof redis-cli       redis-server
```

文件说明：
* redis-server: Redis服务器
* redis-cli: Redis命令行客户端
* redis-benchmark: Redis性能测试工具
* redis-check-aof: AOF文件修复工具
* redis-check-rdb: RDB文件检查工具

### 启动
在Redis的安装目录中有`redis.conf`配置文件，将其复制到`/etc/redis`目录下。通过`redis-server`启动服务
```
$ /usr/local/redis/bin/redis-server /etc/redis/redis.conf
2800:C 21 Jun 22:53:09.560 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
2800:C 21 Jun 22:53:09.560 # Redis version=4.0.9, bits=64, commit=00000000, modified=0, pid=2800, just started
2800:C 21 Jun 22:53:09.560 # Configuration loaded
2800:M 21 Jun 22:53:09.562 * Increased maximum number of open files to 10032 (it was originally set to 256).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 4.0.9 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 2800
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

2800:M 21 Jun 22:53:09.563 # Server initialized
2800:M 21 Jun 22:53:09.563 * DB loaded from disk: 0.000 seconds
2800:M 21 Jun 22:53:09.563 * Ready to accept connections
```
此时，rendis已经启动了，但当我们关闭命令窗口时，`redis-server`程序也结束了，可以将Redis设置为守护进程的方式进行启动

在`redis.conf`文件中，找到`daemonize`，将`no`改成`yes`
```
################################# GENERAL #####################################

# By default Redis does not run as a daemon. Use 'yes' if you need it.
# Note that Redis will write a pid file in /var/run/redis.pid when daemonized.
daemonize yes
```

启动以后通过如下命令查看Redis服务是否启动：
```
$ ps -ef | grep redis
```

通过客户端工具`redis-cli`进入客户端连接Redis
```
$ redis-cli 
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> 
```

### 关闭
* redis-cli shutdown：安全关闭，但是只适用于没有配置密码的场景
* kill -9 pid：强制关闭，可能会造成Redis内存数据丢失
