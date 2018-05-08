id: 59
title: Java定时任务Timer
date: 2018-05-06
category: java
tags: java
description: 定时任务：基于给定时间点、给定时间间隔或给定执行次数自动执行的任务，java中主要通过两种工具来实现定时任务，Timer和Quartz，这里主要说Timer工具。

------
定时任务：基于给定时间点、给定时间间隔或给定执行次数自动执行的任务，java中主要通过两种工具来实现定时任务，`Timer`和`Quartz`，这里主要说`Timer`工具。

### 定义
一总工具，有且仅有**一个后台线程**，对**多个业务线程**进行**定时定频率**的调度。

### 基本介绍

<img src='/images/java/2018/05/06/001.png' width='800px' style='display:block; margin:0px auto;'>
`java.util.Timer` 工具类中有两个重要的成员：`TimerThread`和`TaskQueue`，其中`TimerThread`对应定义中`Timer`工具的后台线程；`TaskQueue`是一个队列，包含了业务线程`TimerTask`。`TimerThread`通过调用队列中的`TimerTask`的`run()`方法实现对任务的定时定频率的调度。实际开发中，我们只需要关注`Timer`和`TimerTask`的编写即可。

### Timer.schedule()方法

在开始编写`Timer`工具代码之前先引入一个日期处理工具类`DateUtil`：
```java
package com.shenjinxiang.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by shenjinxiang on 2018/5/6.
 */
public class DateUtil {

    private final static String TIME_PATTON_DEFAULT = "yyyy-MM-dd HH:mm:ss";


    public static Date getCurrentDate() {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTime();
    }

    public static String getCurrentDateStr() {
        return format(getCurrentDate());
    }

    public static String getCurrentDateStr(String pattern) {
        return format(getCurrentDate(), pattern);
    }

    public static String format(Date date) {
        return format(date, TIME_PATTON_DEFAULT);
    }

    public static String format(Date date, String pattern) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        return simpleDateFormat.format(date);
    }

	public static String format(long time) {
        return format(time, TIME_PATTON_DEFAULT);
    }

    public static String format(long time, String pattern) {
        Date date = new Date(time);
        return format(date, pattern);
    }
}
```

#### 第一种方式

> public void schedule(TimerTask task, Date time)

表示在时间等于或超过`time`的时候执行且仅执行一次`task`。接收两个参数，`task`指定所要安排的任务，`time`指定执行任务的时间。

创建Task类：
```java
package com.shenjinxiang.timer;

import com.shenjinxiang.util.DateUtil;
import java.util.TimerTask;

/**
 * Created by shenjinxiang on 2018/5/6.
 */
public class MyTimerTask extends TimerTask {

    @Override
    public void run() {
        System.out.println("执行任务MyTimerTask，时间：" + DateUtil.getCurrentDateStr());
	}
}
```

调用`MyTimerTask`类，当前时间点执行一次：
```java
public static void main(String[] args) {
	Timer timer = new Timer();
	timer.schedule(new MyTimerTask(), DateUtil.getCurrentDate());
}
```

输出结果：

```
执行任务MyTimerTask，时间：2018-05-06 22:11:23
```

三秒后执行任务一次：
```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	Calendar calendar = Calendar.getInstance();
	calendar.add(Calendar.SECOND, 3);
	timer.schedule(new MyTimerTask(), calendar.getTime());
}
```

输出结果：
```
当前时间：2018-05-06 22:16:07
执行任务MyTimerTask，时间：2018-05-06 22:16:10
```

#### 第二种方式
> public void schedule(TimerTask task, long delay)

等待`delay`毫秒后，执行且仅执行一次任务`task`。

```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	timer.schedule(new MyTimerTask(), 3000);
}
```

输出结果：
```
当前时间：2018-05-06 22:23:32
执行任务MyTimerTask，时间：2018-05-06 22:23:35
```

这里需要注意，如果`delay`参数的值为`0`，表示立刻执行任务；如果`delay`参数的值为负数，则会抛出`java.lang.IllegalArgumentException`异常。

#### 第三种方式

> public void schedule(TimerTask task, Date firstTime, long period)

表示在时间等于或超过`time`的时候执行一次`task`，之后每隔`period`毫秒执行一次`task`。即在种方式的基础上添加了一个参数`period`表示执行的时间间隔，单位是毫秒。

先打印一次系统当前时间，等待3秒后第一次执行任务，之后每隔2秒执行一次
```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	Calendar calendar = Calendar.getInstance();
	calendar.add(Calendar.SECOND, 3);
	timer.schedule(new MyTimerTask(), calendar.getTime(), 2000);
}
```

输出结果：
```
当前时间：2018-05-06 23:10:05
执行任务MyTimerTask，时间：2018-05-06 23:10:08
执行任务MyTimerTask，时间：2018-05-06 23:10:10
执行任务MyTimerTask，时间：2018-05-06 23:10:12
执行任务MyTimerTask，时间：2018-05-06 23:10:14
```

#### 第四种方式

> public void schedule(TimerTask task, long delay, long period)

第四种方式是在第二种方式的基础上添加了一个参数`period`表示执行的时间间隔：

```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	timer.schedule(new MyTimerTask(), 3000, 2000);
}
```

输出结果：
```
当前时间：2018-05-06 23:15:41
执行任务MyTimerTask，时间：2018-05-06 23:15:44
执行任务MyTimerTask，时间：2018-05-06 23:15:46
执行任务MyTimerTask，时间：2018-05-06 23:15:48
执行任务MyTimerTask，时间：2018-05-06 23:15:50
```

四种调用方式都很简单，实际上这四种方式都是调用了`Timer`类的私有方法`void sched(TimerTask task, long time, long period)`来实现的。

```java
// 第一种
public void schedule(TimerTask task, Date time) {
	sched(task, time.getTime(), 0);
}

// 第二种
public void schedule(TimerTask task, long delay) {
	if (delay < 0)
		throw new IllegalArgumentException("Negative delay.");
	sched(task, System.currentTimeMillis()+delay, 0);
}

// 第三种
public void schedule(TimerTask task, Date firstTime, long period) {
	if (period <= 0)
		throw new IllegalArgumentException("Non-positive period.");
	sched(task, firstTime.getTime(), -period);
}

// 第四种
public void schedule(TimerTask task, long delay, long period) {
	if (delay < 0)
		throw new IllegalArgumentException("Negative delay.");
	if (period <= 0)
		throw new IllegalArgumentException("Non-positive period.");
	sched(task, System.currentTimeMillis()+delay, -period);
}
```

### Timer.scheduleAtFixedRate()方法
#### 第一种方式

> public void scheduleAtFixedRate(TimerTask task, Date firstTime, long period)

时间等于或超过`firstTime`时首次执行`task`，之后每隔`period`毫秒执行一次`task`

```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	Calendar calendar = Calendar.getInstance();
	calendar.add(Calendar.SECOND, 3);
	timer.scheduleAtFixedRate(new MyTimerTask(), calendar.getTime(), 2000);
}
```

输出结果：
```
当前时间：2018-05-06 23:42:29
执行任务MyTimerTask，时间：2018-05-06 23:42:32
执行任务MyTimerTask，时间：2018-05-06 23:42:34
执行任务MyTimerTask，时间：2018-05-06 23:42:36
执行任务MyTimerTask，时间：2018-05-06 23:42:38
```

#### 第二种方式

> public void scheduleAtFixedRate(TimerTask task, long delay, long period)

与第一种方式的不同在于第二个参数改为延迟`delay`毫秒后首次执行`task`。

```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	timer.scheduleAtFixedRate(new MyTimerTask(), 3000, 2000);
}
```

输出结果：
```
当前时间：2018-05-06 23:46:06
执行任务MyTimerTask，时间：2018-05-06 23:46:09
执行任务MyTimerTask，时间：2018-05-06 23:46:11
执行任务MyTimerTask，时间：2018-05-06 23:46:13
执行任务MyTimerTask，时间：2018-05-06 23:46:15
```

`scheduleAtFixedRate()`方法同样是通过调用`Timer`的私有方法`sched()`来实现的：

```java
// 第一种
public void scheduleAtFixedRate(TimerTask task, Date firstTime, long period) {
	if (period <= 0)
		throw new IllegalArgumentException("Non-positive period.");
	sched(task, firstTime.getTime(), period);
}

// 第二种
public void scheduleAtFixedRate(TimerTask task, long delay, long period) {
	if (delay < 0)
		throw new IllegalArgumentException("Negative delay.");
	if (period <= 0)
		throw new IllegalArgumentException("Non-positive period.");
	sched(task, System.currentTimeMillis()+delay, period);
}
```

### schedule() 和 scheduleAtFixedRate()的区别
主要有两种区别：
1. 首次计划执行的时间早于当前时间
2. 任务执行所需的时间超过任务的执行周期

#### 首次计划执行的时间早于当前时间
对于`schedule()`方法，如果首次执行时间早于当前时间，随后的执行时间按照上一次实际执行的完成时间点进行计算

```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	Calendar calendar = Calendar.getInstance();
	calendar.add(Calendar.SECOND, -4);
	timer.schedule(new MyTimerTask(), calendar.getTime(), 2000);
}
```

输出结果：
```
当前时间：2018-05-06 23:56:34
执行任务MyTimerTask，时间：2018-05-06 23:56:34
执行任务MyTimerTask，时间：2018-05-06 23:56:36
执行任务MyTimerTask，时间：2018-05-06 23:56:38
执行任务MyTimerTask，时间：2018-05-06 23:56:40
```
可以看到，我们设置的首次执行时间比系统时间早了`4`秒，此时会马上执行一次任务，然后按照每隔`2`秒的时间间隔执行一次。

对于`scheduleAtFixedRate()`方法，如果设置的首次执行时间在当前时间之前，随后的执行时间按照上一次开始的时间点开始计算，并且为了赶上进度，会多次执行任务，因此使用`scheduleAtFixedRate()`需要考虑同步。

```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	Calendar calendar = Calendar.getInstance();
	calendar.add(Calendar.SECOND, -4);
	timer.scheduleAtFixedRate(new MyTimerTask(), calendar.getTime(), 2000);
}
```

输出结果：
```
当前时间：2018-05-07 00:02:12
执行任务MyTimerTask，时间：2018-05-07 00:02:12
执行任务MyTimerTask，时间：2018-05-07 00:02:12
执行任务MyTimerTask，时间：2018-05-07 00:02:12
执行任务MyTimerTask，时间：2018-05-07 00:02:14
执行任务MyTimerTask，时间：2018-05-07 00:02:16
执行任务MyTimerTask，时间：2018-05-07 00:02:18
执行任务MyTimerTask，时间：2018-05-07 00:02:20
```

可以看到因为设置的首次执行时间比系统时间早了`4`秒，所以会先执行三次任务，然后每隔`2`秒执行一次。

#### 任务执行所需的时间超过任务的执行周期
为了看到这个功能，`MyTimerTask`类需要做一些修改:
```java
public class MyTimerTask extends TimerTask {

    @Override
    public void run() {
        System.out.println("---------------------------");
        System.out.println("执行任务MyTimerTask，开始时间：" + DateUtil.getCurrentDateStr());
        System.out.println("计划执行时间：" + DateUtil.format(scheduledExecutionTime()));
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("执行任务MyTimerTask，结束时间：" + DateUtil.getCurrentDateStr());
    }
}
```

关于`scheduledExecutionTime()`方法的，表示最近发生任务执行安排的时间，也就是计划执行时间。

对于`schedule()`方法:
```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	Calendar calendar = Calendar.getInstance();
	timer.schedule(new MyTimerTask(), calendar.getTime(), 2000);
}
```

输出结果：
```
当前时间：2018-05-08 22:03:09
---------------------------
执行任务MyTimerTask，开始时间：2018-05-08 22:03:09
计划执行时间：2018-05-08 22:03:09
执行任务MyTimerTask，结束时间：2018-05-08 22:03:12
---------------------------
执行任务MyTimerTask，开始时间：2018-05-08 22:03:12
计划执行时间：2018-05-08 22:03:12
执行任务MyTimerTask，结束时间：2018-05-08 22:03:15
---------------------------
执行任务MyTimerTask，开始时间：2018-05-08 22:03:15
计划执行时间：2018-05-08 22:03:15
执行任务MyTimerTask，结束时间：2018-05-08 22:03:18
---------------------------
执行任务MyTimerTask，开始时间：2018-05-08 22:03:18
计划执行时间：2018-05-08 22:03:18
执行任务MyTimerTask，结束时间：2018-05-08 22:03:21
```

对于`scheduleAtFixedRate()`方法：

```java
public static void main(String[] args) {
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	Timer timer = new Timer();
	Calendar calendar = Calendar.getInstance();
	timer.scheduleAtFixedRate(new MyTimerTask(), calendar.getTime(), 2000);
}
```

输出结果：
```
当前时间：2018-05-08 22:13:33
---------------------------
执行任务MyTimerTask，开始时间：2018-05-08 22:13:33
计划执行时间：2018-05-08 22:13:33
执行任务MyTimerTask，结束时间：2018-05-08 22:13:36
---------------------------
执行任务MyTimerTask，开始时间：2018-05-08 22:13:36
计划执行时间：2018-05-08 22:13:35
执行任务MyTimerTask，结束时间：2018-05-08 22:13:39
---------------------------
执行任务MyTimerTask，开始时间：2018-05-08 22:13:39
计划执行时间：2018-05-08 22:13:37
执行任务MyTimerTask，结束时间：2018-05-08 22:13:42
```


### TimerTask.cancel()方法
取消当前`TimerTask`里的任务执行

> public boolean cancel()

修改`MyTimerTask`类：
```java
public class MyTimerTask extends TimerTask {

    private String taskName;
    private int count = 0;

    public MyTimerTask(String taskName) {
        this.taskName = taskName;
    }

    @Override
    public void run() {
        count++;
        System.out.println("第" + this.count + "次执行任务，任务名称：" + this.taskName);
        if (count >= 3) {
            cancel();
			System.out.println("任务：" + this.taskName + "已关闭");
        }
    }
}
```

调用代码：
```java
public static void main(String[] args) {
	Timer timer = new Timer();
	MyTimerTask task = new MyTimerTask("任务1");
	timer.schedule(task, 3000, 2000);
}
```

输出结果：
```
第1次执行任务，任务名称：任务1
第2次执行任务，任务名称：任务1
第3次执行任务，任务名称：任务1
任务：任务1已关闭
```
这里通过判断`count`，设置了任务最多执行3次，执行完3次以后就关闭该任务

### Timer.cancel()方法
终止次计时器，丢弃所有当前已安排的任务

> public void cancel()


修改`MyTimerTask`类：
```java
public class MyTimerTask extends TimerTask {

    private String taskName;
    private int count = 0;

    public MyTimerTask(String taskName) {
        this.taskName = taskName;
    }

    @Override
    public void run() {
        count++;
        System.out.println("任务：" + this.taskName + " 第" + this.count + "次执行，执行时间：" + DateUtil.getCurrentDateStr());
    }
}
```

待用代码：
```java
public static void main(String[] args) throws InterruptedException {
	Timer timer = new Timer();
	MyTimerTask task1 = new MyTimerTask("任务a");
	MyTimerTask task2 = new MyTimerTask("任务b");
	System.out.println("当前时间：" + DateUtil.getCurrentDateStr());
	timer.schedule(task1, 1000, 2000);
	timer.schedule(task2, 2000, 3000);
	Thread.sleep(10 * 1000);
	System.out.println("休眠10秒以后时间：" + DateUtil.getCurrentDateStr());
	timer.cancel();
	System.out.println("所有任务已经关闭");
}
```

输出结果：
```
当前时间：2018-05-08 22:41:47
任务：任务a 第1次执行，执行时间：2018-05-08 22:41:48
任务：任务b 第1次执行，执行时间：2018-05-08 22:41:49
任务：任务a 第2次执行，执行时间：2018-05-08 22:41:50
任务：任务a 第3次执行，执行时间：2018-05-08 22:41:52
任务：任务b 第2次执行，执行时间：2018-05-08 22:41:52
任务：任务a 第4次执行，执行时间：2018-05-08 22:41:54
任务：任务b 第3次执行，执行时间：2018-05-08 22:41:55
任务：任务a 第5次执行，执行时间：2018-05-08 22:41:56
休眠10秒以后时间：2018-05-08 22:41:57
所有任务已经关闭
```
可以看出来`Timer.cancel()`方法是直接把`Timer`的这个线程关闭了

### Timer.purge()方法
从此计时器的任务队列中，移除已取消的任务

> public int purge()

`Timer`计时器可以配置多个任务，保存在任务队列`TaskQueue`中，如果有一部分任务因为某些情况已经取消了，就可以通过这个方法将已经取消的任务移出任务队列中，减少线程开支。返回从队列中移除的任务数。

### Timer计时器的缺陷
#### 管理并发任务的缺陷
因为`Timer`有且只有一个线程去执行定时任务，如果存在多个任务，且任务时间过长，会导致执行效果与预期不符
#### 当任务抛出异常时的缺陷
如果`TimerTask`抛出`RuntimeException`，`Timer`会停止所有任务的运行。
