id: 61
title: Redis 配置
date: 2018-06-21
category: redis
tags: redis
description: 上一篇说了 Redis 的安装、启动以及关闭，这篇对 Reids 的配置进行总结

------
上一篇说了 Redis 的安装、启动以及关闭，这篇对 Reids 的配置进行总结

### redis.config 文件
Redis 的配置文件位于安装目录下，文件名为`redis.conf`，上一篇中我们已经将该文件复制到`/etc/redis`目录下，打开文件。
```
$ vim /etc/redis/redis.conf
```

### 开头部分
```
# Redis configuration file example.
#
# Note that in order to read the configuration file, Redis must be
# started with the file path as first argument:
#
# ./redis-server /path/to/redis.conf
```
这里指明，Redis 服务启动的时候需要指定配置文件`redis.conf`的路径为`redis-server`的第一个参数，用于加载配置的参数

```
# Note on units: when memory size is needed, it is possible to specify
# it in the usual form of 1k 5GB 4M and so forth:
#
# 1k => 1000 bytes
# 1kb => 1024 bytes
# 1m => 1000000 bytes
# 1mb => 1024*1024 bytes
# 1g => 1000000000 bytes
# 1gb => 1024*1024*1024 bytes
#
# units are case insensitive so 1GB 1Gb 1gB are all the same.
```
需要用到设置内存大小时，可以指定单位，通常是以`k`、`gb`、`m`等形式出现，并且单位**不区分大小写**。

### INCLUDES 
```
################################## INCLUDES ###################################

# Include one or more other config files here.  This is useful if you
# have a standard template that goes to all Redis servers but also need
# to customize a few per-server settings.  Include files can include
# other files, so use this wisely.
#
# Notice option "include" won't be rewritten by command "CONFIG REWRITE"
# from admin or Redis Sentinel. Since Redis always uses the last processed
# line as value of a configuration directive, you'd better put includes
# at the beginning of this file to avoid overwriting config change at runtime.
#
# If instead you are interested in using includes to override configuration
# options, it is better to use include as the last line.
#
# include /path/to/local.conf
# include /path/to/other.conf
```
可以将配置写到不同的文件中，再通过`include` 将其配置到`redis.conf`文件中，`redis.conf`就是总的配置文件。
需要注意的是，同样的配置属性，后面配置的会覆盖前面的，如果将`include`配置写再文件开头，那么后面的配置会覆盖引入文件的配置，如果想以引入文件的配置为主，那么需要将`include`写再`redis.conf`的末尾

### MODULES
```
################################## MODULES #####################################

# Load modules at startup. If the server is not able to load modules
# it will abort. It is possible to use multiple loadmodule directives.
#
# loadmodule /path/to/my_module.so
# loadmodule /path/to/other_module.so
```
通过这里的 loadmodule 配置将引入自定义模块来新增一些功能。这一块还未研究。

### NETWORK 
```
################################## NETWORK #####################################

# By default, if no "bind" configuration directive is specified, Redis listens
# for connections from all the network interfaces available on the server.
# It is possible to listen to just one or multiple selected interfaces using
# the "bind" configuration directive, followed by one or more IP addresses.
#
# Examples:
#
# bind 192.168.1.100 10.0.0.1
# bind 127.0.0.1 ::1
#
# ~~~ WARNING ~~~ If the computer running Redis is directly exposed to the
# internet, binding to all the interfaces is dangerous and will expose the
# instance to everybody on the internet. So by default we uncomment the
# following bind directive, that will force Redis to listen only into
# the IPv4 lookback interface address (this means Redis will be able to
# accept connections only from clients running into the same computer it
# is running).
#
# IF YOU ARE SURE YOU WANT YOUR INSTANCE TO LISTEN TO ALL THE INTERFACES
# JUST COMMENT THE FOLLOWING LINE.
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
bind 127.0.0.1
```
配置绑定的主机地址，默认为`127.0.0.1`，即本地回环地址。这样的话，访问 Redis 服务只能通过本机的客户端连接，而无法通过远程连接a。可以在`bind`后配置多个IP地址。如果`bind`选项为空的话，那么接受所有来自于可用网络接口的连接。

```
# Protected mode is a layer of security protection, in order to avoid that
# Redis instances left open on the internet are accessed and exploited.
#
# When protected mode is on and if:
#
# 1) The server is not binding explicitly to a set of addresses using the
#    "bind" directive.
# 2) No password is configured.
#
# The server only accepts connections from clients connecting from the
# IPv4 and IPv6 loopback addresses 127.0.0.1 and ::1, and from Unix domain
# sockets.
#
# By default protected mode is enabled. You should disable it only if
# you are sure you want clients from other hosts to connect to Redis
# even if no authentication is configured, nor a specific set of interfaces
# are explicitly listed using the "bind" directive.
protected-mode yes
```

`protected-mode`参数处于Redis安全考虑，禁止外网访问 Redis 服务。如果需要外网访问：
1. 通过`bind`配置绑定服务器ip置
2. 修改`protected-mode`的值为`no`，某些时候需要同时修改`sentinel.conf`文件
3. 通过`requirepass`配置口令

```
# Accept connections on the specified port, default is 6379 (IANA #815344).
# If port 0 is specified Redis will not listen on a TCP socket.
port 6379
```
指定 Redis 运行时监听的端口，默认是`6379`

```
# TCP listen() backlog.
#
# In high requests-per-second environments you need an high backlog in order
# to avoid slow clients connections issues. Note that the Linux kernel
# will silently truncate it to the value of /proc/sys/net/core/somaxconn so
# make sure to raise both the value of somaxconn and tcp_max_syn_backlog
# in order to get the desired effect.
tcp-backlog 511
```
TCP 监听的最大容纳数量，高并发环境下，需要把这个值调高以避免客户端连接缓慢的问题，Linux 内核会悄悄把这个值缩小成`/proc/sys/net/core/somaxconn` 对应的值，所以需要修改这两个值才能达到预期

```
# Close the connection after a client is idle for N seconds (0 to disable)
timeout 0
```
指定在一个 client 空闲多少秒之后关闭连接（0 就是不管它）

```
# TCP keepalive.
#
# If non-zero, use SO_KEEPALIVE to send TCP ACKs to clients in absence
# of communication. This is useful for two reasons:
#
# 1) Detect dead peers.
# 2) Take the connection alive from the point of view of network
#    equipment in the middle.
#
# On Linux, the specified value (in seconds) is the period used to send ACKs.
# Note that to close the connection the double of the time is needed.
# On other kernels the period depends on the kernel configuration.
#
# A reasonable value for this option is 300 seconds, which is the new
# Redis default starting with Redis 3.2.1.
tcp-keepalive 300
```
单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测

### GENERAL 
```
################################# GENERAL #####################################

# By default Redis does not run as a daemon. Use 'yes' if you need it.
# Note that Redis will write a pid file in /var/run/redis.pid when daemonized.
daemonize no
```
默认情况下 Redis 不是作为守护进程运行的，如果想让它在后台运行，需要将`daemonize`配置为`yes`。

```
# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised no
```
可以通过upstart和systemd管理Redis守护进程
* supervised no - 没有监督互动
* supervised upstart - 通过将 Redis 置于`SIGSTOP`模式来启动信号
* supervised systemd - signal systemd将`READY = 1`写入`$ NOTIFY_SOCKET`
* supervised auto - 检测upstart或systemd方法基于 `UPSTART_JOB`或`NOTIFY_SOCKET`环境变量

```
# If a pid file is specified, Redis writes it where specified at startup
# and removes it at exit.
#
# When the server runs non daemonized, no pid file is created if none is
# specified in the configuration. When the server is daemonized, the pid file
# is used even if not specified, defaulting to "/var/run/redis.pid".
#
# Creating a pid file is best effort: if Redis is not able to create it
# nothing bad happens, the server will start and run normally.
pidfile /var/run/redis_6379.pid
```
当 Redis 作为守护进程运行的时候，它会把 `pid` 默认写到 `/var/run/redis.pid` 文件里面。可以在这里指定它的文件位置

```
# Specify the server verbosity level.
# This can be one of:
# debug (a lot of information, useful for development/testing)
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably)
# warning (only very important / critical messages are logged)
loglevel notice
```
可以通过`loglevel`配置日志级别，有四种取值：
* debug - 记录大量日志信息，适用于开发、测试阶段
* verbose - 较多日志信息
* notice - 默认值，适量日志信息，使用于生产环境
* warning - 仅有部分重要、关键信息才会被记录

```
# Specify the log file name. Also the empty string can be used to force
# Redis to log on the standard output. Note that if you use standard
# output for logging but daemonize, logs will be sent to /dev/null
logfile ""

# To enable logging to the system logger, just set 'syslog-enabled' to yes,
# and optionally update the other syslog parameters to suit your needs.
# syslog-enabled no

# Specify the syslog identity.
# syslog-ident redis

# Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.
# syslog-facility local0
```
`logfile` - 日志文件的位置，当指定为空字符串时，为标准输出，如果redis已守护进程模式运行，那么日志将会输出到`/dev/null`
`syslog-enabled` - 要想把日志记录到系统日志，就把它改成 `yes`，也可以可选择性的更新其他的`syslog` 参数以达到你的要求
`syslog-ident` - 设置系统日志的`ID`
`syslog-facility` - 指定系统日志设置，必须是 `USER` 或者是 `LOCAL0`-`LOCAL7` 之间的值

```
# Set the number of databases. The default database is DB 0, you can select
# a different one on a per-connection basis using SELECT <dbid> where
# dbid is a number between 0 and 'databases'-1
databases 16
```
设置数据库的数目。默认的数据库是`DB 0` ，可以在每个连接上使用`select  dbid` 命令选择一个不同的数据库，`dbid`是一个介于`0`到`databases - 1` 之间的数值。

```
# By default Redis shows an ASCII art logo only when started to log to the
# standard output and if the standard output is a TTY. Basically this means
# that normally a logo is displayed only in interactive sessions.
#
# However it is possible to force the pre-4.0 behavior and always show a
# ASCII art logo in startup logs by setting the following option to yes.
always-show-logo yes
```
Redis 启动时是否显示Logo

### SNAPSHOTTING  
```
################################ SNAPSHOTTING  ################################
#
# Save the DB on disk:
#
#   save <seconds> <changes>
#
#   Will save the DB if both the given number of seconds and the given
#   number of write operations against the DB occurred.
#
#   In the example below the behaviour will be to save:
#   after 900 sec (15 min) if at least 1 key changed
#   after 300 sec (5 min) if at least 10 keys changed
#   after 60 sec if at least 10000 keys changed
#
#   Note: you can disable saving completely by commenting out all "save" lines.
#
#   It is also possible to remove all the previously configured save
#   points by adding a save directive with a single empty string argument
#   like in the following example:
#
#   save ""

save 900 1
save 300 10
save 60 10000
```
保存数据到硬盘中，根据给定的时间间隔和写入次数将数据保存到磁盘
> save 间隔时间（秒） 写入次数

```
# 900 秒内如果至少有 1 个 key 的值变化，则保存
save 900 1
# 300 秒内如果至少有 10 个 key 的值变化，则保存
save 300 10
# 60 秒内如果至少有 10000 个 key 的值变化，则保存
save 60 10000
```

```
# By default Redis will stop accepting writes if RDB snapshots are enabled
# (at least one save point) and the latest background save failed.
# This will make the user aware (in a hard way) that data is not persisting
# on disk properly, otherwise chances are that no one will notice and some
# disaster will happen.
#
# If the background saving process will start working again Redis will
# automatically allow writes again.
#
# However if you have setup your proper monitoring of the Redis server
# and persistence, you may want to disable this feature so that Redis will
# continue to work as usual even if there are problems with disk,
# permissions, and so forth.
stop-writes-on-bgsave-error yes
```
如果用户开启了`RDB`快照功能，那么在 Redis 持久化数据到磁盘时如果出现失败，默认情况下，redis会停止接受所有的写请求。
这样做的好处在于可以让用户很明确的知道内存中的数据和磁盘上的数据已经存在不一致了。如果redis不顾这种不一致，一意孤行的继续接收写请求，就可能会引起一些灾难性的后果。 
如果下一次`RDB`持久化成功，Redis会自动恢复接受写请求。
如果不在乎这种数据不一致或者有其他的手段发现和控制这种不一致的话，可以关闭这个功能， 以便在快照写入失败时，也能确保 Redis 继续接受新的写请求。

```
# Compress string objects using LZF when dump .rdb databases?
# For default that's set to 'yes' as it's almost always a win.
# If you want to save some CPU in the saving child set it to 'no' but
# the dataset will likely be bigger if you have compressible values or keys.
rdbcompression yes
```
对于存储到磁盘中的快照，可以设置是否进行压缩存储。 如果值为`yes`的话，Redis 会采用`LZF`算法进行压缩。如果不想消耗CPU来进行压缩的话，可以设置为`no`关闭此功能，但是存储在磁盘上的快照会比较大。

```
# Since version 5 of RDB a CRC64 checksum is placed at the end of the file.
# This makes the format more resistant to corruption but there is a performance
# hit to pay (around 10%) when saving and loading RDB files, so you can disable it
# for maximum performances.
#
# RDB files created with checksum disabled have a checksum of zero that will
# tell the loading code to skip the check.
rdbchecksum yes
```
在存储快照后，我们还可以让 Redis 使用`CRC64`算法来进行数据校验，但是这样做会增加大约`10%`的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能。

```
# The filename where to dump the DB
dbfilename dump.rdb
```
通过`dbfilename`设置数据保存的文件名

```
# The working directory.
#
# The DB will be written inside this directory, with the filename specified
# above using the 'dbfilename' configuration directive.
#
# The Append Only File will also be created inside this directory.
#
# Note that you must specify a directory here, not a file name.
dir ./
```
设置数据文件保存的目录，只能是一个目录，而不能是文件名。

### REPLICATION
```
################################# REPLICATION #################################

# Master-Slave replication. Use slaveof to make a Redis instance a copy of
# another Redis server. A few things to understand ASAP about Redis replication.
#
# 1) Redis replication is asynchronous, but you can configure a master to
#    stop accepting writes if it appears to be not connected with at least
#    a given number of slaves.
# 2) Redis slaves are able to perform a partial resynchronization with the
#    master if the replication link is lost for a relatively small amount of
#    time. You may want to configure the replication backlog size (see the next
#    sections of this file) with a sensible value depending on your needs.
# 3) Replication is automatic and does not need user intervention. After a
#    network partition slaves automatically try to reconnect to masters
#    and resynchronize with them.
#
# slaveof <masterip> <masterport>

# If the master is password protected (using the "requirepass" configuration
# directive below) it is possible to tell the slave to authenticate before
# starting the replication synchronization process, otherwise the master will
# refuse the slave request.
#
# masterauth <master-password>

# When a slave loses its connection with the master, or when the replication
# is still in progress, the slave can act in two different ways:
#
# 1) if slave-serve-stale-data is set to 'yes' (the default) the slave will
#    still reply to client requests, possibly with out of date data, or the
#    data set may just be empty if this is the first synchronization.
#
# 2) if slave-serve-stale-data is set to 'no' the slave will reply with
#    an error "SYNC with master in progress" to all the kind of commands
#    but to INFO and SLAVEOF.
#
slave-serve-stale-data yes
```
> slaveof &lt;masterip&gt; &lt;masterport&gt;

Redis 主从复制，使用 `slaveof` 来让一个 Redis 实例成为另一个 Reids 实例的副本，只需要在副本上设置即可。

> masterauth &lt;master-password&gt;

如果主 Redis 实例需要密码验证，通过`masterauth`来设置

> slave-serve-stale-data yes

当一个`slave`与`master`失去联系，或复制正在进行的时候，`slave`可能会有两种情况：
1. 如果为`yes`，`slave`仍然会应答客户端请求，但返回的数据可能是过时，或者数据可能在第一次同步的时候是空的
2. 如果为`no`，在你执行除了`info he salveof`之外的其他命令时，`slave`都将返回`SYNC with master in progress`的错误

```
# You can configure a slave instance to accept writes or not. Writing against
# a slave instance may be useful to store some ephemeral data (because data
# written on a slave will be easily deleted after resync with the master) but
# may also cause problems if clients are writing to it because of a
# misconfiguration.
#
# Since Redis 2.6 by default slaves are read-only.
#
# Note: read only slaves are not designed to be exposed to untrusted clients
# on the internet. It's just a protection layer against misuse of the instance.
# Still a read only slave exports by default all the administrative commands
# such as CONFIG, DEBUG, and so forth. To a limited extent you can improve
# security of read only slaves using 'rename-command' to shadow all the
# administrative / dangerous commands.
slave-read-only yes
```
配置`slave`实例是否只读，从 Redis 2.6 版起，默认`slaves`都是只读的。

```
# Replication SYNC strategy: disk or socket.
#
# -------------------------------------------------------
# WARNING: DISKLESS REPLICATION IS EXPERIMENTAL CURRENTLY
# -------------------------------------------------------
#
# New slaves and reconnecting slaves that are not able to continue the replication
# process just receiving differences, need to do what is called a "full
# synchronization". An RDB file is transmitted from the master to the slaves.
# The transmission can happen in two different ways:
#
# 1) Disk-backed: The Redis master creates a new process that writes the RDB
#                 file on disk. Later the file is transferred by the parent
#                 process to the slaves incrementally.
# 2) Diskless: The Redis master creates a new process that directly writes the
#              RDB file to slave sockets, without touching the disk at all.
#
# With disk-backed replication, while the RDB file is generated, more slaves
# can be queued and served with the RDB file as soon as the current child producing
# the RDB file finishes its work. With diskless replication instead once
# the transfer starts, new slaves arriving will be queued and a new transfer
# will start when the current one terminates.
#
# When diskless replication is used, the master waits a configurable amount of
# time (in seconds) before starting the transfer in the hope that multiple slaves
# will arrive and the transfer can be parallelized.
#
# With slow disks and fast (large bandwidth) networks, diskless replication
# works better.
repl-diskless-sync no
```
配置是否使用`socket`方式复制数据，即“无硬盘”方式。目前 Redis 复制提供`disk`和`socket`两种方式，
如果有新的副本实例或重连的副本无法部分同步，就会执行完全备份，`master`会将`rdb`文件同步到`slave`上。

1. `disk`方式：是`master`创建一个新的进程把`rdb`文件保存到磁盘，再把磁盘上的`rdb`文件传递给`slave`，当一个`rdb`保存的过程中，多个`slave`都能共享这个`rdb`文件
2. `socket`方式：是`master`创建一个新的进程，直接把`rdb`文件以`socket`的方式发给`slave`，在磁盘速度缓慢，网速快的情况下推荐用此方式。

```
# When diskless replication is enabled, it is possible to configure the delay
# the server waits in order to spawn the child that transfers the RDB via socket
# to the slaves.
#
# This is important since once the transfer starts, it is not possible to serve
# new slaves arriving, that will be queued for the next RDB transfer, so the server
# waits a delay in order to let more slaves arrive.
#
# The delay is specified in seconds, and by default is 5 seconds. To disable
# it entirely just set it to 0 seconds and the transfer will start ASAP.
repl-diskless-sync-delay 5
```
当使用`socket`即“无硬盘”方式备份数据，服务器延迟一段时间后才会通过套接字向从站传送`rdb`文件，延迟时间单位为秒，默认为`5`秒。
一旦传送开始，就不可能再为一个新到达的从站服务。从站则要排队等待下一次`rdb`传送。因此服务器需要等待一段时间使得更多的从站到达。
如果设置为`0`秒，就是关闭此功能，传送会立即启动。

```
# Slaves send PINGs to server in a predefined interval. It's possible to change
# this interval with the repl_ping_slave_period option. The default value is 10
# seconds.
#
# repl-ping-slave-period 10
```
`slave`会周期性的向`master`发出`PING`包，可以通过`repl_ping_slave_period`指令来控制发送周期，默认时间间隔是`10`秒。

```
# The following option sets the replication timeout for:
#
# 1) Bulk transfer I/O during SYNC, from the point of view of slave.
# 2) Master timeout from the point of view of slaves (data, pings).
# 3) Slave timeout from the point of view of masters (REPLCONF ACK pings).
#
# It is important to make sure that this value is greater than the value
# specified for repl-ping-slave-period otherwise a timeout will be detected
# every time there is low traffic between the master and the slave.
#
# repl-timeout 60
```
用于设置备份超时时间
1. 从从站的角度，同步期间的批量传输的I/O
2. 从站角度认为的主站超时（数据，`ping`）
3. 主站角度认为的从站超时（`REPLCONF ACK pings`)

确认这些值比定义的`repl-ping-slave-period`要大，否则每次主站和从站之间通信低速时都会被检测为超时。

```
# Disable TCP_NODELAY on the slave socket after SYNC?
#
# If you select "yes" Redis will use a smaller number of TCP packets and
# less bandwidth to send data to slaves. But this can add a delay for
# the data to appear on the slave side, up to 40 milliseconds with
# Linux kernels using a default configuration.
#
# If you select "no" the delay for data to appear on the slave side will
# be reduced but more bandwidth will be used for replication.
#
# By default we optimize for low latency, but in very high traffic conditions
# or when the master and slaves are many hops away, turning this to "yes" may
# be a good idea.
repl-disable-tcp-nodelay no
```
同步之后是否禁用从站上的`TCP_NODELAY`

* 值为`yes`：Redis 会使用较少量的`TCP`包和带宽向从站发送数据。但这会导致在从站增加一点数据的延时。Linux 内核默认配置情况下最多`40`毫秒的延时
* 值为`no`：从站的数据延时不会那么多，但备份需要的带宽相对较多。

默认情况下我们将潜在因素优化，但在高负载情况下或者在主从站都跳的情况下，设置为`yes`是个好主意。

```
# Set the replication backlog size. The backlog is a buffer that accumulates
# slave data when slaves are disconnected for some time, so that when a slave
# wants to reconnect again, often a full resync is not needed, but a partial
# resync is enough, just passing the portion of data the slave missed while
# disconnected.
#
# The bigger the replication backlog, the longer the time the slave can be
# disconnected and later be able to perform a partial resynchronization.
#
# The backlog is only allocated once there is at least a slave connected.
#
# repl-backlog-size 1mb
```
设置备份的工作储备大小。工作储备是一个缓冲区，当`slave`断开一段时间的情况时，它替`slave`接收存储数据，因此当`slave`重连时，通常不需要完全备份，只需要一个部分同步就可以，即把`slave`断开时错过的一部分数据接收。
工作储备越大，`slave`可以断开并稍后执行部分同步的断开时间就越长。
只要有一个`slave`连接，就会立刻分配一个工作储备。

```
# After a master has no longer connected slaves for some time, the backlog
# will be freed. The following option configures the amount of seconds that
# need to elapse, starting from the time the last slave disconnected, for
# the backlog buffer to be freed.
#
# Note that slaves never free the backlog for timeout, since they may be
# promoted to masters later, and should be able to correctly "partially
# resynchronize" with the slaves: hence they should always accumulate backlog.
#
# A value of 0 means to never release the backlog.
#
# repl-backlog-ttl 3600
```
主站有一段时间没有与从站连接，对应的工作储备就会自动释放。`repl-backlog-ttl`用于配置释放前等待的秒数，秒数从断开的那一刻开始计算，值为`0`表示不释放。

```
# The slave priority is an integer number published by Redis in the INFO output.
# It is used by Redis Sentinel in order to select a slave to promote into a
# master if the master is no longer working correctly.
#
# A slave with a low priority number is considered better for promotion, so
# for instance if there are three slaves with priority 10, 100, 25 Sentinel will
# pick the one with priority 10, that is the lowest.
#
# However a special priority of 0 marks the slave as not able to perform the
# role of master, so a slave with priority of 0 will never be selected by
# Redis Sentinel for promotion.
#
# By default the priority is 100.
slave-priority 100
```
配置`slave`的优先级，默认优先级是100，`slave`优先级是可以从 Redis 的`INFO`命令输出中查到的一个整数。当`master`不能正常工作时 Redis `sentinel`使用它来选择一个`slave`并将它提升为`master`。
低优先级的`slave`被认为更适合于提升，因此如果有三个`slave`优先级分别是`10`，`100`，`25`，`sentinel`会选择优先级为`10`的`slave`，因为它的优先级最低。
当优先级值为`0`，不能执行`master`的角色，因此优先级为`0`的`slave`永远不会被Redis `sentinel`提升。

```
# It is possible for a master to stop accepting writes if there are less than
# N slaves connected, having a lag less or equal than M seconds.
#
# The N slaves need to be in "online" state.
#
# The lag in seconds, that must be <= the specified value, is calculated from
# the last ping received from the slave, that is usually sent every second.
#
# This option does not GUARANTEE that N replicas will accept the write, but
# will limit the window of exposure for lost writes in case not enough slaves
# are available, to the specified number of seconds.
#
# For example to require at least 3 slaves with a lag <= 10 seconds use:
#
# min-slaves-to-write 3
# min-slaves-max-lag 10
#
# Setting one or the other to 0 disables the feature.
#
# By default min-slaves-to-write is set to 0 (feature disabled) and
# min-slaves-max-lag is set to 10.
```
`master`可以停止接受写请求，当与它连接的`slave`少于`N`个，滞后少于`M`秒，`N`个`slave`必须是在线状态。
延迟的秒数必须小于等于`min-slaves-max-log`所定义的值，延迟秒数是从最后一次收到的来自`slave`的`ping`开始计算。`ping`通常是每秒一次。
这一选项并不保证`N`个备份都会接受写请求，但是会限制在指定秒数内由于`slave`数量不够导致的写操作丢失的情况。

如果想要至少3个从站且延迟少于10秒:
> min-slaves-to-write 3
> min-slaves-max-lag 10


```
# A Redis master is able to list the address and port of the attached
# slaves in different ways. For example the "INFO replication" section
# offers this information, which is used, among other tools, by
# Redis Sentinel in order to discover slave instances.
# Another place where this info is available is in the output of the
# "ROLE" command of a master.
#
# The listed IP and address normally reported by a slave is obtained
# in the following way:
#
#   IP: The address is auto detected by checking the peer address
#   of the socket used by the slave to connect with the master.
#
#   Port: The port is communicated by the slave during the replication
#   handshake, and is normally the port that the slave is using to
#   list for connections.
#
# However when port forwarding or Network Address Translation (NAT) is
# used, the slave may be actually reachable via different IP and port
# pairs. The following two options can be used by a slave in order to
# report to its master a specific set of IP and port, so that both INFO
# and ROLE will report those values.
#
# There is no need to use both the options if you need to override just
# the port or the IP address.
#
# slave-announce-ip 5.5.5.5
# slave-announce-port 1234
```
Redis `master`能够以不同的方式列出所连接slave的地址和端口。 
例如，“INFO replication”部分提供此信息，除了其他工具之外，Redis Sentinel还使用该信息来发现`slave`实例。
此信息可用的另一个地方在masterser的“ROLE”命令的输出中。
通常由`slave`报告的列出的`IP`和地址,通过以下方式获得：
* IP：通过检查`slave`与`master`连接使用的套接字的对等体地址自动检测地址。
* 端口：端口在复制握手期间由`slavet`通信，并且通常是`slave`正在使用列出连接的端口。

当使用端口转发或网络地址转换（NAT）时，`slave`实际上可以通过(不同的`IP`和端口对)来到达。 `slave`可以使用`salve-announce-ip`和`slave-announce-port`这两个选项，以便向`master`报告一组特定的`IP`和端口，以便`INFO`和`ROLE`将报告这些值。如果需要仅覆盖端口或1IP`地址，则没必要使用这两个选项。

### SECURITY
```
################################## SECURITY ###################################

# Require clients to issue AUTH <PASSWORD> before processing any other
# commands.  This might be useful in environments in which you do not trust
# others with access to the host running redis-server.
#
# This should stay commented out for backward compatibility and because most
# people do not need auth (e.g. they run their own servers).
#
# Warning: since Redis is pretty fast an outside user can try up to
# 150k passwords per second against a good box. This means that you should
# use a very strong password otherwise it will be very easy to break.
#
# requirepass foobared
```
用于设置 Redis 连接密码。

```
# Command renaming.
#
# It is possible to change the name of dangerous commands in a shared
# environment. For instance the CONFIG command may be renamed into something
# hard to guess so that it will still be available for internal-use tools
# but not available for general clients.
#
# Example:
#
# rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52
#
# It is also possible to completely kill a command by renaming it into
# an empty string:
#
# rename-command CONFIG ""
#
# Please note that changing the name of commands that are logged into the
# AOF file or transmitted to slaves may cause problems.
```
重命名命令，出于安全性考虑，可以将一些危险的命令进行重命名

> rename-command 原命令名 "新命令"

作为服务器端，常常需要禁止使用某些命令，使得服务器更加安全，将新命名的值设置为空字符串即可。
重命名以后，原命令不能再使用，否则会报错`unknown command`。

常见的危险命令：
* flushdb - 清空数据库
* flushall - 清空所有数据库
* config - 客户端连接后可配置服务器
* keys - 客户端连接后可以查看所有存在的键

### CLIENTS 
```
################################### CLIENTS ####################################

# Set the max number of connected clients at the same time. By default
# this limit is set to 10000 clients, however if the Redis server is not
# able to configure the process file limit to allow for the specified limit
# the max number of allowed clients is set to the current file limit
# minus 32 (as Redis reserves a few file descriptors for internal uses).
#
# Once the limit is reached Redis will close all the new connections sending
# an error 'max number of clients reached'.
#
# maxclients 10000
```
设置客户端最大并发连接数，默认无限制，Redis 可以同时打开的客户端连接数为 Redis 进程可以打开的最大文件 
如果设置`maxclients`为`0`表示不作限制。
当客户端连接数到达限制时，Redis 会关闭新的连接并向客户端返回`max number of clients reached`错误信息

### MEMORY MANAGEMENT 
```
############################## MEMORY MANAGEMENT ################################

# Set a memory usage limit to the specified amount of bytes.
# When the memory limit is reached Redis will try to remove keys
# according to the eviction policy selected (see maxmemory-policy).
#
# If Redis can't remove keys according to the policy, or if the policy is
# set to 'noeviction', Redis will start to reply with errors to commands
# that would use more memory, like SET, LPUSH, and so on, and will continue
# to reply to read-only commands like GET.
#
# This option is usually useful when using Redis as an LRU or LFU cache, or to
# set a hard memory limit for an instance (using the 'noeviction' policy).
#
# WARNING: If you have slaves attached to an instance with maxmemory on,
# the size of the output buffers needed to feed the slaves are subtracted
# from the used memory count, so that network problems / resyncs will
# not trigger a loop where keys are evicted, and in turn the output
# buffer of slaves is full with DELs of keys evicted triggering the deletion
# of more keys, and so forth until the database is completely emptied.
#
# In short... if you have slaves attached it is suggested that you set a lower
# limit for maxmemory so that there is some free RAM on the system for slave
# output buffers (but this is not needed if the policy is 'noeviction').
#
# maxmemory <bytes>
```
指定 Redis 最大内存限制，Redis 在启动时会把数据加载到内存中，达到最大内存后，Redis 会先尝试清除已到期或即将到期的`Key`，如果仍然到达最大内存设置，将无法再进行写入操作，但仍然可以进行读取操作。
Redis 新的`vm`机制，会把`Key`存放内存，`Value`会存放在`swap`区

```
# MAXMEMORY POLICY: how Redis will select what to remove when maxmemory
# is reached. You can select among five behaviors:
#
# volatile-lru -> Evict using approximated LRU among the keys with an expire set.
# allkeys-lru -> Evict any key using approximated LRU.
# volatile-lfu -> Evict using approximated LFU among the keys with an expire set.
# allkeys-lfu -> Evict any key using approximated LFU.
# volatile-random -> Remove a random key among the ones with an expire set.
# allkeys-random -> Remove a random key, any key.
# volatile-ttl -> Remove the key with the nearest expire time (minor TTL)
# noeviction -> Don't evict anything, just return an error on write operations.
#
# LRU means Least Recently Used
# LFU means Least Frequently Used
#
# Both LRU, LFU and volatile-ttl are implemented using approximated
# randomized algorithms.
#
# Note: with any of the above policies, Redis will return an error on write
#       operations, when there are no suitable keys for eviction.
#
#       At the date of writing these commands are: set setnx setex append
#       incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd
#       sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby
#       zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby
#       getset mset msetnx exec sort
#
# The default is:
#
# maxmemory-policy noeviction
```
当内存使用达到最大值时，Redis 使用的清除策略。有以下几种可以选择：
* volatile-lru   利用`LRU`算法移除设置过过期时间的`key` (LRU:最近使用 Least Recently Used ) 
* allkeys-lru   利用`LRU`算法移除任何`key`
* volatile-random 移除设置过过期时间的随机`key` 
* allkeys-random  移除随机`key`
* volatile-ttl   移除即将过期的`key`(minor TTL) 
* noeviction  noeviction   不移除任何`key`，只是返回一个写错误 ，默认选项

```
# LRU, LFU and minimal TTL algorithms are not precise algorithms but approximated
# algorithms (in order to save memory), so you can tune it for speed or
# accuracy. For default Redis will check five keys and pick the one that was
# used less recently, you can change the sample size using the following
# configuration directive.
#
# The default of 5 produces good enough results. 10 Approximates very closely
# true LRU but costs more CPU. 3 is faster but not very accurate.
#
# maxmemory-samples 5
```
`LRU` 和 `minimal TTL` 算法都不是精准的算法，但是相对精确的算法(为了节省内存)
可以选择样本大小进行检，Redis 默认选择`3`个样本进行检测，可以通过`maxmemory-samples`进行设置样本数

### LAZY FREEING 
```
############################# LAZY FREEING ####################################

# Redis has two primitives to delete keys. One is called DEL and is a blocking
# deletion of the object. It means that the server stops processing new commands
# in order to reclaim all the memory associated with an object in a synchronous
# way. If the key deleted is associated with a small object, the time needed
# in order to execute the DEL command is very small and comparable to most other
# O(1) or O(log_N) commands in Redis. However if the key is associated with an
# aggregated value containing millions of elements, the server can block for
# a long time (even seconds) in order to complete the operation.
#
# For the above reasons Redis also offers non blocking deletion primitives
# such as UNLINK (non blocking DEL) and the ASYNC option of FLUSHALL and
# FLUSHDB commands, in order to reclaim memory in background. Those commands
# are executed in constant time. Another thread will incrementally free the
# object in the background as fast as possible.
#
# DEL, UNLINK and ASYNC option of FLUSHALL and FLUSHDB are user-controlled.
# It's up to the design of the application to understand when it is a good
# idea to use one or the other. However the Redis server sometimes has to
# delete keys or flush the whole database as a side effect of other operations.
# Specifically Redis deletes objects independently of a user call in the
# following scenarios:
#
# 1) On eviction, because of the maxmemory and maxmemory policy configurations,
#    in order to make room for new data, without going over the specified
#    memory limit.
# 2) Because of expire: when a key with an associated time to live (see the
#    EXPIRE command) must be deleted from memory.
# 3) Because of a side effect of a command that stores data on a key that may
#    already exist. For example the RENAME command may delete the old key
#    content when it is replaced with another one. Similarly SUNIONSTORE
#    or SORT with STORE option may delete existing keys. The SET command
#    itself removes any old content of the specified key in order to replace
#    it with the specified string.
# 4) During replication, when a slave performs a full resynchronization with
#    its master, the content of the whole database is removed in order to
#    load the RDB file just transfered.
#
# In all the above cases the default is to delete objects in a blocking way,
# like if DEL was called. However you can configure each case specifically
# in order to instead release memory in a non-blocking way like if UNLINK
# was called, using the following configuration directives:

lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
slave-lazy-flush no
```

### APPEND ONLY MODE 
```
############################## APPEND ONLY MODE ###############################

# By default Redis asynchronously dumps the dataset on disk. This mode is
# good enough in many applications, but an issue with the Redis process or
# a power outage may result into a few minutes of writes lost (depending on
# the configured save points).
#
# The Append Only File is an alternative persistence mode that provides
# much better durability. For instance using the default data fsync policy
# (see later in the config file) Redis can lose just one second of writes in a
# dramatic event like a server power outage, or a single write if something
# wrong with the Redis process itself happens, but the operating system is
# still running correctly.
#
# AOF and RDB persistence can be enabled at the same time without problems.
# If the AOF is enabled on startup Redis will load the AOF, that is the file
# with the better durability guarantees.
#
# Please check http://redis.io/topics/persistence for more information.

appendonly no
```
Redis 默认使用的是`rdb`方式持久化，这种方式在许多应用中已经足够用了。但是 Redis 如果中途宕机，会导致可能有几分钟的数据丢失。
Append Only File是另一种持久化方式，可以提供更好的持久化特性。Redis 会把每次写入的数据在接收后都写入`appendonly.aof`文件，每次启动时 Redis 都会先把这个文件的数据读入内存里

```
# The name of the append only file (default: "appendonly.aof")

appendfilename "appendonly.aof"
```
`aof`文件名

```
# The fsync() call tells the Operating System to actually write data on disk
# instead of waiting for more data in the output buffer. Some OS will really flush
# data on disk, some other OS will just try to do it ASAP.
#
# Redis supports three different modes:
#
# no: don't fsync, just let the OS flush the data when it wants. Faster.
# always: fsync after every write to the append only log. Slow, Safest.
# everysec: fsync only one time every second. Compromise.
#
# The default is "everysec", as that's usually the right compromise between
# speed and data safety. It's up to you to understand if you can relax this to
# "no" that will let the operating system flush the output buffer when
# it wants, for better performances (but if you can live with the idea of
# some data loss consider the default persistence mode that's snapshotting),
# or on the contrary, use "always" that's very slow but a bit safer than
# everysec.
#
# More details please check the following article:
# http://antirez.com/post/redis-persistence-demystified.html
#
# If unsure, use "everysec".

# appendfsync always
appendfsync everysec
# appendfsync no
```
配置`AOF`持久化策略
* no - 不执行`fsync`，由操作系统保证数据同步到磁盘，速度最快。
* always - 每次写入都执行`fsync`，以保证数据同步到磁盘。
* everysec - 每秒执行一次`fsync`，可能会导致丢失这1s数据

```
# When the AOF fsync policy is set to always or everysec, and a background
# saving process (a background save or AOF log background rewriting) is
# performing a lot of I/O against the disk, in some Linux configurations
# Redis may block too long on the fsync() call. Note that there is no fix for
# this currently, as even performing fsync in a different thread will block
# our synchronous write(2) call.
#
# In order to mitigate this problem it's possible to use the following option
# that will prevent fsync() from being called in the main process while a
# BGSAVE or BGREWRITEAOF is in progress.
#
# This means that while another child is saving, the durability of Redis is
# the same as "appendfsync none". In practical terms, this means that it is
# possible to lose up to 30 seconds of log in the worst scenario (with the
# default Linux settings).
#
# If you have latency problems turn this to "yes". Otherwise leave it as
# "no" that is the safest pick from the point of view of durability.

no-appendfsync-on-rewrite no
```
在`AOF`重写或者写入`rdb`文件的时候，会执行大量IO，此时对于`everysec`和`always`的`AOF`模式来说，执行`fsync`会造成阻塞过长时间，`no-appendfsync-on-rewrite`字段设置为默认设置为`no`。如果对延迟要求很高的应用，这个字段可以设置为`yes`，否则还是设置为`no`，这样对持久化特性来说这是更安全的选择。
设置为`yes`表示`rewrite`期间对新写操作不`fsync`，暂时存在内存中，等`rewrite`完成后再写入，默认为`no`，建议`yes`。
Linux的默认fsync策略是30秒。可能丢失30秒数据。

```
# Automatic rewrite of the append only file.
# Redis is able to automatically rewrite the log file implicitly calling
# BGREWRITEAOF when the AOF log size grows by the specified percentage.
#
# This is how it works: Redis remembers the size of the AOF file after the
# latest rewrite (if no rewrite has happened since the restart, the size of
# the AOF at startup is used).
#
# This base size is compared to the current size. If the current size is
# bigger than the specified percentage, the rewrite is triggered. Also
# you need to specify a minimal size for the AOF file to be rewritten, this
# is useful to avoid rewriting the AOF file even if the percentage increase
# is reached but it is still pretty small.
#
# Specify a percentage of zero in order to disable the automatic AOF
# rewrite feature.

auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```
* auto-aof-rewrite-percentage - 是`AOF`自动重写配置，当目前`aof`文件大小超过上一次重写的`aof`文件大小的百分的多少进行重写。当`aof`文件增长到一定大小的时候，Redis能够调用`bgrewriteaof`对日志文件进行重写。当前`aof`文件大小是上次日志重写得到`aof`文件大小的二倍（设置为`100`）时，自动启动新的日志重写过程。
* auto-aof-rewrite-min-size - 设置允许重写的最小`aof`文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写

```
# An AOF file may be found to be truncated at the end during the Redis
# startup process, when the AOF data gets loaded back into memory.
# This may happen when the system where Redis is running
# crashes, especially when an ext4 filesystem is mounted without the
# data=ordered option (however this can't happen when Redis itself
# crashes or aborts but the operating system still works correctly).
#
# Redis can either exit with an error when this happens, or load as much
# data as possible (the default now) and start if the AOF file is found
# to be truncated at the end. The following option controls this behavior.
#
# If aof-load-truncated is set to yes, a truncated AOF file is loaded and
# the Redis server starts emitting a log to inform the user of the event.
# Otherwise if the option is set to no, the server aborts with an error
# and refuses to start. When the option is set to no, the user requires
# to fix the AOF file using the "redis-check-aof" utility before to restart
# the server.
#
# Note that if the AOF file will be found to be corrupted in the middle
# the server will still exit with an error. This option only applies when
# Redis will try to read more data from the AOF file but not enough bytes
# will be found.
aof-load-truncated yes
```
`aof`文件可能在尾部是不完整的，当Redis启动的时候，`aof`文件的数据被载入内存。重启可能发生在 Redis 所在的主机操作系统宕机后，尤其在`ext4`文件系统没有加上`data=ordered`选项，出现这种现象，Redis 宕机或者异常终止不会造成尾部不完整现象，可以选择让 Redis 退出，或者导入尽可能多的数据。
* yes - 当截断的aof文件被导入的时候，会自动发布一个log给客户端然后load。
* no - 用户必须手动`redis-check-aof`修复`aof`文件才可以。

```
# When rewriting the AOF file, Redis is able to use an RDB preamble in the
# AOF file for faster rewrites and recoveries. When this option is turned
# on the rewritten AOF file is composed of two different stanzas:
#
#   [RDB file][AOF tail]
#
# When loading Redis recognizes that the AOF file starts with the "REDIS"
# string and loads the prefixed RDB file, and continues loading the AOF
# tail.
#
# This is currently turned off by default in order to avoid the surprise
# of a format change, but will at some point be used as the default.
aof-use-rdb-preamble no
```

### LUA SCRIPTING 
```
################################ LUA SCRIPTING  ###############################

# Max execution time of a Lua script in milliseconds.
#
# If the maximum execution time is reached Redis will log that a script is
# still in execution after the maximum allowed time and will start to
# reply to queries with an error.
#
# When a long running script exceeds the maximum execution time only the
# SCRIPT KILL and SHUTDOWN NOSAVE commands are available. The first can be
# used to stop a script that did not yet called write commands. The second
# is the only way to shut down the server in the case a write command was
# already issued by the script but the user doesn't want to wait for the natural
# termination of the script.
#
# Set it to 0 or a negative value for unlimited execution without warnings.
lua-time-limit 5000
```
限制 Lua 脚本的最长运行时间，默认为5秒钟。当脚步运行时间超过最大执行时间后：
* Redis 记录一个脚本正在超时运行
* Redis 开始重新接受其他客户端的命令请求，但是只有`SCRIPT KILL`和`SHUTDOWN NOSAVE`两个命令会被处理，对于其他命令请求， Redis 服务器只是简单地返回`BUSY`错误。
* 可以使用 `SCRIPT KILL` 命令将一个仅执行只读命令的脚本杀死，因为只读命令并不修改数据，因此杀死这个脚本并不破坏数据的完整性
* 如果脚本已经执行过写命令，那么唯一允许执行的操作就是 `SHUTDOWN NOSAVE`，它通过停止服务器来阻止当前数据集写入磁盘

### REDIS CLUSTER  
```
################################ REDIS CLUSTER  ###############################
#
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# WARNING EXPERIMENTAL: Redis Cluster is considered to be stable code, however
# in order to mark it as "mature" we need to wait for a non trivial percentage
# of users to deploy it in production.
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#
# Normal Redis instances can't be part of a Redis Cluster; only nodes that are
# started as cluster nodes can. In order to start a Redis instance as a
# cluster node enable the cluster support uncommenting the following:
#
# cluster-enabled yes
```
集群开关，默认是不开启集群模式

```
# Every cluster node has a cluster configuration file. This file is not
# intended to be edited by hand. It is created and updated by Redis nodes.
# Every Redis Cluster node requires a different cluster configuration file.
# Make sure that instances running in the same system do not have
# overlapping cluster configuration file names.
#
# cluster-config-file nodes-6379.conf
```
集群配置文件的名称，每个节点都有一个集群相关的配置文件，持久化保存集群的信息。这个文件并不需要手动配置，这个配置文件有 Redis 生成并更新，每个 Redis 集群节点需要一个单独的配置文件，请确保与实例运行的系统中配置文件名称不冲突

```
# Cluster node timeout is the amount of milliseconds a node must be unreachable
# for it to be considered in failure state.
# Most other internal time limits are multiple of the node timeout.
#
# cluster-node-timeout 15000
```
节点互连超时的阀值，集群节点超时毫秒数

```
# Cluster node timeout is the amount of milliseconds a node must be unreachable
# for it to be considered in failure state.
# Most other internal time limits are multiple of the node timeout.
#
# cluster-node-timeout 15000

# A slave of a failing master will avoid to start a failover if its data
# looks too old.
#
# There is no simple way for a slave to actually have an exact measure of
# its "data age", so the following two checks are performed:
#
# 1) If there are multiple slaves able to failover, they exchange messages
#    in order to try to give an advantage to the slave with the best
#    replication offset (more data from the master processed).
#    Slaves will try to get their rank by offset, and apply to the start
#    of the failover a delay proportional to their rank.
#
# 2) Every single slave computes the time of the last interaction with
#    its master. This can be the last ping or command received (if the master
#    is still in the "connected" state), or the time that elapsed since the
#    disconnection with the master (if the replication link is currently down).
#    If the last interaction is too old, the slave will not try to failover
#    at all.
#
# The point "2" can be tuned by user. Specifically a slave will not perform
# the failover if, since the last interaction with the master, the time
# elapsed is greater than:
#
#   (node-timeout * slave-validity-factor) + repl-ping-slave-period
#
# So for example if node-timeout is 30 seconds, and the slave-validity-factor
# is 10, and assuming a default repl-ping-slave-period of 10 seconds, the
# slave will not try to failover if it was not able to talk with the master
# for longer than 310 seconds.
#
# A large slave-validity-factor may allow slaves with too old data to failover
# a master, while a too small value may prevent the cluster from being able to
# elect a slave at all.
#
# For maximum availability, it is possible to set the slave-validity-factor
# to a value of 0, which means, that slaves will always try to failover the
# master regardless of the last time they interacted with the master.
# (However they'll always try to apply a delay proportional to their
# offset rank).
#
# Zero is the only value able to guarantee that when all the partitions heal
# the cluster will always be able to continue.
#
# cluster-slave-validity-factor 10
```
判断`slave`节点与`master`断线的时间是否过长。 在进行故障转移的时候，全部`slave`都会请求申请为`master`，但是有些`slave`可能与`master`断开连接一段时间了，导致数据过于陈旧，这样的`slave`不应该被提升为`master`。通过`cluster-slave-validity-factor`来判断
判断方法是：
比较slave断开连接的时间`(node-timeout * slave-validity-factor) + repl-ping-slave-period`,如果节点超时时间为三十秒, 并且`slave-validity-factor`为`10`，假设默认的`repl-ping-slave-period`是`10`秒，即如果超过`310`秒`slave`将不会尝试进行故障转移

```
# Cluster slaves are able to migrate to orphaned masters, that are masters
# that are left without working slaves. This improves the cluster ability
# to resist to failures as otherwise an orphaned master can't be failed over
# in case of failure if it has no working slaves.
#
# Slaves migrate to orphaned masters only if there are still at least a
# given number of other working slaves for their old master. This number
# is the "migration barrier". A migration barrier of 1 means that a slave
# will migrate only if there is at least 1 other working slave for its master
# and so forth. It usually reflects the number of slaves you want for every
# master in your cluster.
#
# Default is 1 (slaves migrate only if their masters remain with at least
# one slave). To disable migration just set it to a very large value.
# A value of 0 can be set but is useful only for debugging and dangerous
# in production.
#
# cluster-migration-barrier 1
```
`master`的`slave`数量大于该值，`slave`才能迁移到其他孤立`master`上，如这个参数若被设为2，那么只有当一个主节点拥有`2`个可工作的从节点时，它的一个从节点会尝试迁移。

```
# By default Redis Cluster nodes stop accepting queries if they detect there
# is at least an hash slot uncovered (no available node is serving it).
# This way if the cluster is partially down (for example a range of hash slots
# are no longer covered) all the cluster becomes, eventually, unavailable.
# It automatically returns available as soon as all the slots are covered again.
#
# However sometimes you want the subset of the cluster which is working,
# to continue to accept queries for the part of the key space that is still
# covered. In order to do so, just set the cluster-require-full-coverage
# option to no.
#
# cluster-require-full-coverage yes
```
默认情况下，集群全部的`slot`有节点负责，集群状态才为`ok`，才能提供服务。设置为`no`，可以在`slot`没有全部分配的时候提供服务。
不建议打开该配置，这样会造成分区的时候，小分区的master一直在接受写请求，而造成很长时间数据不一致

```
# This option, when set to yes, prevents slaves from trying to failover its
# master during master failures. However the master can still perform a
# manual failover, if forced to do so.
#
# This is useful in different scenarios, especially in the case of multiple
# data center operations, where we want one side to never be promoted if not
# in the case of a total DC failure.
#
# cluster-slave-no-failover no
```

### CLUSTER DOCKER/NAT support
```
########################## CLUSTER DOCKER/NAT support  ########################

# In certain deployments, Redis Cluster nodes address discovery fails, because
# addresses are NAT-ted or because ports are forwarded (the typical case is
# Docker and other containers).
#
# In order to make Redis Cluster working in such environments, a static
# configuration where each node knows its public address is needed. The
# following two options are used for this scope, and are:
#
# * cluster-announce-ip
# * cluster-announce-port
# * cluster-announce-bus-port
#
# Each instruct the node about its address, client port, and cluster message
# bus port. The information is then published in the header of the bus packets
# so that other nodes will be able to correctly map the address of the node
# publishing the information.
#
# If the above options are not used, the normal Redis Cluster auto-detection
# will be used instead.
#
# Note that when remapped, the bus port may not be at the fixed offset of
# clients port + 10000, so you can specify any port and bus-port depending
# on how they get remapped. If the bus-port is not set, a fixed offset of
# 10000 will be used as usually.
#
# Example:
#
# cluster-announce-ip 10.1.1.5
# cluster-announce-port 6379
# cluster-announce-bus-port 6380
```

### SLOW LOG 
```
# The Redis Slow Log is a system to log queries that exceeded a specified
# execution time. The execution time does not include the I/O operations
# like talking with the client, sending the reply and so forth,
# but just the time needed to actually execute the command (this is the only
# stage of command execution where the thread is blocked and can not serve
# other requests in the meantime).
#
# You can configure the slow log with two parameters: one tells Redis
# what is the execution time, in microseconds, to exceed in order for the
# command to get logged, and the other parameter is the length of the
# slow log. When a new command is logged the oldest one is removed from the
# queue of logged commands.

# The following time is expressed in microseconds, so 1000000 is equivalent
# to one second. Note that a negative number disables the slow log, while
# a value of zero forces the logging of every command.
slowlog-log-slower-than 10000

# There is no limit to this length. Just be aware that it will consume memory.
# You can reclaim memory used by the slow log with SLOWLOG RESET.
slowlog-max-len 128
```
> slowlog-log-slower-than 10000

`slow log`是用来记录redis运行中执行比较慢的命令耗时。当命令的执行超过了指定时间，就记录在`slow log`中，`slow log`保存在内存中，所以没有IO操作。
执行时间比`slowlog-log-slower-than`大的请求记录到`slow log`里面，单位是微秒，所以`1000000`就是`1`秒。
注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。

> slowlog-max-len 128

慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉，这个长度没有限制。
只要有足够的内存就行，你可以通过 `SLOWLOG RESET` 来释放内存

### LATENCY MONITOR 
```
################################ LATENCY MONITOR ##############################

# The Redis latency monitoring subsystem samples different operations
# at runtime in order to collect data related to possible sources of
# latency of a Redis instance.
#
# Via the LATENCY command this information is available to the user that can
# print graphs and obtain reports.
#
# The system only logs operations that were performed in a time equal or
# greater than the amount of milliseconds specified via the
# latency-monitor-threshold configuration directive. When its value is set
# to zero, the latency monitor is turned off.
#
# By default latency monitoring is disabled since it is mostly not needed
# if you don't have latency issues, and collecting data has a performance
# impact, that while very small, can be measured under big load. Latency
# monitoring can easily be enabled at runtime using the command
# "CONFIG SET latency-monitor-threshold <milliseconds>" if needed.
latency-monitor-threshold 0
```
延迟监控功能是用来监控 Redis 中执行比较缓慢的一些操作，用`LATENCY`打印 Redis 实例在跑命令时的耗时图表。
只记录大于等于设置的值的操作，`0`的话，就是关闭监视。
默认延迟监控功能是关闭的，如果需要打开，也可以通过`CONFIG SET`命令动态设置。

### EVENT NOTIFICATION 
```
############################# EVENT NOTIFICATION ##############################

# Redis can notify Pub/Sub clients about events happening in the key space.
# This feature is documented at http://redis.io/topics/notifications
#
# For instance if keyspace events notification is enabled, and a client
# performs a DEL operation on key "foo" stored in the Database 0, two
# messages will be published via Pub/Sub:
#
# PUBLISH __keyspace@0__:foo del
# PUBLISH __keyevent@0__:del foo
#
# It is possible to select the events that Redis will notify among a set
# of classes. Every class is identified by a single character:
#
#  K     Keyspace events, published with __keyspace@<db>__ prefix.
#  E     Keyevent events, published with __keyevent@<db>__ prefix.
#  g     Generic commands (non-type specific) like DEL, EXPIRE, RENAME, ...
#  $     String commands
#  l     List commands
#  s     Set commands
#  h     Hash commands
#  z     Sorted set commands
#  x     Expired events (events generated every time a key expires)
#  e     Evicted events (events generated when a key is evicted for maxmemory)
#  A     Alias for g$lshzxe, so that the "AKE" string means all the events.
#
#  The "notify-keyspace-events" takes as argument a string that is composed
#  of zero or multiple characters. The empty string means that notifications
#  are disabled.
#
#  Example: to enable list and generic events, from the point of view of the
#           event name, use:
#
#  notify-keyspace-events Elg
#
#  Example 2: to get the stream of the expired keys subscribing to channel
#             name __keyevent@0__:expired use:
#
#  notify-keyspace-events Ex
#
#  By default all notifications are disabled because most users don't need
#  this feature and the feature has some overhead. Note that if you don't
#  specify at least one of K or E, no events will be delivered.
notify-keyspace-events ""
```
客户端可以通过订阅频道或模式，来接收那些以某种方式改动了 Redis 数据集的事件。因为开启键空间通知功能需要消耗一些 CPU ，所以在默认配置下，该功能处于关闭状态。
`notify-keyspace-events` 指定了服务器该发送哪些类型的通知：
* K 键空间通知，所有通知以 `__keyspace@__` 为前缀
* E 键事件通知，所有通知以 `__keyevent@__` 为前缀
* g `DEL`、 `EXPIRE`、 `RENAME`等类型无关的通用命令的通知
* $ 字符串命令的通知
* l 列表命令的通知
* s 集合命令的通知
* h 哈希命令的通知
* z 有序集合命令的通知
* x 过期事件：每当有过期键被删除时发送
* e 驱逐(evict)事件：每当有键因为 `maxmemory` 政策而被删除时发送
* A 参数 `g$lshzxe` 的别名

输入的参数中至少要有一个 K 或者 E，否则的话，不管其余的参数是什么，都不会有任何通知被分发。

### ADVANCED CONFIG 
```
############################### ADVANCED CONFIG ###############################

# Hashes are encoded using a memory efficient data structure when they have a
# small number of entries, and the biggest entry does not exceed a given
# threshold. These thresholds can be configured using the following directives.
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
```
> hash-max-ziplist-entries 512

这个参数指的是`ziplist`中允许存储的最大条目个数，默认为`512`，建议为`128`
`hash`类型的数据结构在编码上可以使用`ziplist`和`hashtable`。
`ziplist`的特点就是文件存储(以及内存存储)所需的空间较小，在内容较小时，性能和`hashtable`几乎一样。因此Redis对`hash`类型默认采取`ziplist`。如果`hash`中条目的条目个数或者`value`长度达到阀值,将会被重构为`hashtable`。

> hash-max-ziplist-value 64

`ziplist`中允许条目`value`值最大字节数，默认为`64`，建议为`1024`

```
# Lists are also encoded in a special way to save a lot of space.
# The number of entries allowed per internal list node can be specified
# as a fixed maximum size or a maximum number of elements.
# For a fixed maximum size, use -5 through -1, meaning:
# -5: max size: 64 Kb  <-- not recommended for normal workloads
# -4: max size: 32 Kb  <-- not recommended
# -3: max size: 16 Kb  <-- probably not recommended
# -2: max size: 8 Kb   <-- good
# -1: max size: 4 Kb   <-- good
# Positive numbers mean store up to _exactly_ that number of elements
# per list node.
# The highest performing option is usually -2 (8 Kb size) or -1 (4 Kb size),
# but if your use case is unique, adjust the settings as necessary.
list-max-ziplist-size -2
```
当取正值的时候，表示按照数据项个数来限定每个`quicklist`节点上的`ziplist`长度。比如，当这个参数配置成`5`的时候，表示每个`quicklist`节点的`ziplist`最多包含`5`个数据项。
当取负值的时候，表示按照占用字节数来限定每个`quicklist`节点上的`ziplist`长度。这时，它只能取`-`1到`-5`这五个值，每个值含义如下：
* -5: 每个`quicklist`节点上的`ziplist`大小不能超过`64 Kb`。（注：1kb => 1024 bytes）
* -4: 每个`quicklist`节点上的`ziplist`大小不能超过`32 Kb`。
* -3: 每个`quicklist`节点上的`ziplist`大小不能超过`16 Kb`。
* -2: 每个`quicklist`节点上的`ziplist`大小不能超过`8 Kb`。（`-2`是Redis给出的默认值）
* -1: 每个`quicklist`节点上的`ziplist`大小不能超过`4 Kb`。

```
# Lists may also be compressed.
# Compress depth is the number of quicklist ziplist nodes from *each* side of
# the list to *exclude* from compression.  The head and tail of the list
# are always uncompressed for fast push/pop operations.  Settings are:
# 0: disable all list compression
# 1: depth 1 means "don't start compressing until after 1 node into the list,
#    going from either the head or tail"
#    So: [head]->node->node->...->node->[tail]
#    [head], [tail] will always be uncompressed; inner nodes will compress.
# 2: [head]->[next]->node->node->...->node->[prev]->[tail]
#    2 here means: don't compress head or head->next or tail->prev or tail,
#    but compress all nodes between them.
# 3: [head]->[next]->[next]->node->node->...->node->[prev]->[prev]->[tail]
# etc.
list-compress-depth 0
```
这个参数表示一个`quicklist`两端不被压缩的节点个数。
注：这里的节点个数是指`quicklist`双向链表的节点个数，而不是指`ziplist`里面的数据项个数。
实际上，一个`quicklist`节点上的`ziplist`，如果被压缩，就是整体被压缩的。
参数`list-compress-depth`的取值含义如下：
* 0: 是个特殊值，表示都不压缩。这是Redis的默认值。
* 1: 表示`quicklist`两端各有`1`个节点不压缩，中间的节点压缩。
* 2: 表示`quicklist`两端各有`2`个节点不压缩，中间的节点压缩。
* 3: 表示`quicklist`两端各有`3`个节点不压缩，中间的节点压缩。
    依此类推…

由于`0`是个特殊值，很容易看出`quicklist`的头节点和尾节点总是不被压缩的，以便于在表的两端进行快速存取。

```
# Sets have a special encoding in just one case: when a set is composed
# of just strings that happen to be integers in radix 10 in the range
# of 64 bit signed integers.
# The following configuration setting sets the limit in the size of the
# set in order to use this special memory saving encoding.
set-max-intset-entries 512
```
数据量小于等于`set-max-intset-entries`用`intset`，大于`set-max-intset-entries`用`set`

```
# Similarly to hashes and lists, sorted sets are also specially encoded in
# order to save a lot of space. This encoding is only used when the length and
# elements of a sorted set are below the following limits:
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
```
数据量小于等于`zset-max-ziplist-entries`用`ziplist`，大于`zset-max-ziplist-entries`用`zset`

```
# HyperLogLog sparse representation bytes limit. The limit includes the
# 16 bytes header. When an HyperLogLog using the sparse representation crosses
# this limit, it is converted into the dense representation.
#
# A value greater than 16000 is totally useless, since at that point the
# dense representation is more memory efficient.
#
# The suggested value is ~ 3000 in order to have the benefits of
# the space efficient encoding without slowing down too much PFADD,
# which is O(N) with the sparse encoding. The value can be raised to
# ~ 10000 when CPU is not a concern, but space is, and the data set is
# composed of many HyperLogLogs with cardinality in the 0 - 15000 range.
hll-sparse-max-bytes 3000
```
`value`大小小于等于`hll-sparse-max-bytes`使用稀疏数据结构（`sparse`）
大于`hll-sparse-max-bytes`使用稠密的数据结构（`dense`），一个比`16000`大的`value`是几乎没用的，
建议的`value`大概为`3000`。如果对CPU要求不高，对空间要求较高的，建议设置到`10000`左右

```
# Active rehashing uses 1 millisecond every 100 milliseconds of CPU time in
# order to help rehashing the main Redis hash table (the one mapping top-level
# keys to values). The hash table implementation Redis uses (see dict.c)
# performs a lazy rehashing: the more operation you run into a hash table
# that is rehashing, the more rehashing "steps" are performed, so if the
# server is idle the rehashing is never complete and some more memory is used
# by the hash table.
#
# The default is to use this millisecond 10 times every second in order to
# actively rehash the main dictionaries, freeing memory when possible.
#
# If unsure:
# use "activerehashing no" if you have hard latency requirements and it is
# not a good thing in your environment that Redis can reply from time to time
# to queries with 2 milliseconds delay.
#
# use "activerehashing yes" if you don't have such hard requirements but
# want to free memory asap when possible.
activerehashing yes
```
Redis将在每`100`毫秒时使用`1`毫秒的CPU时间来对 Redis 的`hash`表进行重新`hash`，可以降低内存的使用。
使用场景中，有非常严格的实时性需要，不能够接受 Redis 时不时的对请求有`2`毫秒的延迟的话，把这项配置为`no`。
如果没有这么严格的实时性要求，可以设置为`yes`，以便能够尽可能快的释放内存

```
# The client output buffer limits can be used to force disconnection of clients
# that are not reading data from the server fast enough for some reason (a
# common reason is that a Pub/Sub client can't consume messages as fast as the
# publisher can produce them).
#
# The limit can be set differently for the three different classes of clients:
#
# normal -> normal clients including MONITOR clients
# slave  -> slave clients
# pubsub -> clients subscribed to at least one pubsub channel or pattern
#
# The syntax of every client-output-buffer-limit directive is the following:
#
# client-output-buffer-limit <class> <hard limit> <soft limit> <soft seconds>
#
# A client is immediately disconnected once the hard limit is reached, or if
# the soft limit is reached and remains reached for the specified number of
# seconds (continuously).
# So for instance if the hard limit is 32 megabytes and the soft limit is
# 16 megabytes / 10 seconds, the client will get disconnected immediately
# if the size of the output buffers reach 32 megabytes, but will also get
# disconnected if the client reaches 16 megabytes and continuously overcomes
# the limit for 10 seconds.
#
# By default normal clients are not limited because they don't receive data
# without asking (in a push way), but just after a request, so only
# asynchronous clients may create a scenario where data is requested faster
# than it can read.
#
# Instead there is a default limit for pubsub and slave clients, since
# subscribers and slaves receive data in a push fashion.
#
# Both the hard or the soft limit can be disabled by setting them to zero.
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit slave 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
```

> client-output-buffer-limit normal 0 0 0

对客户端输出缓冲进行限制可以强迫那些不从服务器读取数据的客户端断开连接，用来强制关闭传输缓慢的客户端。
对于`normal client`，第一个`0`表示取消`hard limit`，第二个`0`和第三个0表示取消`soft limit`，`normal client`默认取消限制，因为如果没有寻问，他们是不会接收数据的

> client-output-buffer-limit slave 256mb 64mb 60

对于`slave client`和`MONITER client`，如果`client-output-buffer`一旦超过`256mb`，又或者超过`64mb`持续`60`秒，那么服务器就会立即断开客户端连接。

> client-output-buffer-limit pubsub 32mb 8mb 60

对于`pubsub client`，如果`client-output-buffer`一旦超过`32mb`，又或者超过`8mb`持续`60`秒，那么服务器就会立即断开客户端连接。
