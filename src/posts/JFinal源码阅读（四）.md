id: 71
title: JFinal源码阅读（四）
date: 2018-07-18
category: java
tags: java, jfinal
description: 这里主要介绍 JFinal 的日志系统，JFinal 的日志系统初始化工作在 com.jfinal.core.Config.configJFinal(JFinalConfig jfinalConfig) 方法中：

------
这里主要介绍 JFinal 的日志系统，JFinal的日志系统初始化工作在`com.jfinal.core.Config.configJFinal(JFinalConfig jfinalConfig)`方法中：
```java
static void configJFinal(JFinalConfig jfinalConfig) {
	initLogFactory();
}

private static void initLogFactory() {
	LogManager.me().init();
	log = Log.getLog(Config.class);
	JFinalFilter.initLog();
}
```

### 整个结构
<img src='/images/java/2018/07/18/01.png' width='800px' style='display:block; margin:0px auto;'>

可以看到整个Log系统是一个工厂方法模式：
* 抽象产品：com.jfinal.log.Log 类，这是一个抽象类，提供了log产品可以执行的所有操作
* 具体产品：JFinal中提供了两个具体产品：`com.jfinal.log.JdkLog`和`com.jfinal.log.Log4jLog`，继承并实现了Log类的所有抽象方法
* 抽象工厂：com.jfinal.log.ILogFactory 接口，声明了创建Log对象的两个方法
* 具体工厂：com.jfinal.log.JdkLogFactory 和 com.jfinal.log.Log4jLogFactory 分别创建 JdkLog和Log4jLog

除了上述几个类以外，JFinal提供了`com.jfinal.log.LogManager`来管理Log的初始化和设置工作，另外提供了`com.jfinal.kit.LogKit`工具类方便开发的时候调用。

下面是涉及到工厂模式的一些代码：
### ILogFactory
```java
package com.jfinal.log;

public interface ILogFactory {
	
	Log getLog(Class<?> clazz);
	Log getLog(String name);
}
```

### JdkLogFactory
```java
public class JdkLogFactory implements ILogFactory {
	
	public Log getLog(Class<?> clazz) {
		return new JdkLog(clazz);
	}
	
	public Log getLog(String name) {
		return new JdkLog(name);
	}
}
```

### Log4jLogFactory
```java
public class Log4jLogFactory implements ILogFactory {
	
	public Log getLog(Class<?> clazz) {
		return new Log4jLog(clazz);
	}
	
	public Log getLog(String name) {
		return new Log4jLog(name);
	}
}
```

### Log
```java
public abstract class Log {
	
	public abstract void debug(String message);
	
	public abstract void debug(String message, Throwable t);
	
	public abstract void info(String message);
	
	public abstract void info(String message, Throwable t);
	
	public abstract void warn(String message);
	
	public abstract void warn(String message, Throwable t);
	
	public abstract void error(String message);
	
	public abstract void error(String message, Throwable t);
	
	public abstract void fatal(String message);
	
	public abstract void fatal(String message, Throwable t);
	
	public abstract boolean isDebugEnabled();

	public abstract boolean isInfoEnabled();

	public abstract boolean isWarnEnabled();

	public abstract boolean isErrorEnabled();
	
	public abstract boolean isFatalEnabled();
}
```
抽象产品类，声明了Log产品的各种行为。还有部分代码没贴上，下面会说到。

### JdkLog
```java
public class JdkLog extends Log {

	private java.util.logging.Logger log;
	private String clazzName;
	
	JdkLog(Class<?> clazz) {
		log = java.util.logging.Logger.getLogger(clazz.getName());
		clazzName = clazz.getName();
	}
	
	JdkLog(String name) {
		log = java.util.logging.Logger.getLogger(name);
		clazzName = name;
	}
	
	public static JdkLog getLog(Class<?> clazz) {
		return new JdkLog(clazz);
	}
	
	public static JdkLog getLog(String name) {
		return new JdkLog(name);
	}
	
	public void debug(String message) {
		log.logp(Level.FINE, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message);
	}
	
	public void debug(String message,  Throwable t) {
		log.logp(Level.FINE, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message, t);
	}
	
	public void info(String message) {
		log.logp(Level.INFO, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message);
	}
	
	public void info(String message, Throwable t) {
		log.logp(Level.INFO, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message, t);
	}
	
	public void warn(String message) {
		log.logp(Level.WARNING, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message);
	}
	
	public void warn(String message, Throwable t) {
		log.logp(Level.WARNING, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message, t);
	}
	
	public void error(String message) {
		log.logp(Level.SEVERE, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message);
	}
	
	public void error(String message, Throwable t) {
		log.logp(Level.SEVERE, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message, t);
	}
	
	/**
	 * JdkLog fatal is the same as the error.
	 */
	public void fatal(String message) {
		log.logp(Level.SEVERE, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message);
	}
	
	/**
	 * JdkLog fatal is the same as the error.
	 */
	public void fatal(String message, Throwable t) {
		log.logp(Level.SEVERE, clazzName, Thread.currentThread().getStackTrace()[1].getMethodName(), message, t);
	}
	
	public boolean isDebugEnabled() {
		return log.isLoggable(Level.FINE);
	}
	
	public boolean isInfoEnabled() {
		return log.isLoggable(Level.INFO);
	}
	
	public boolean isWarnEnabled() {
		return log.isLoggable(Level.WARNING);
	}
	
	public boolean isErrorEnabled() {
		return log.isLoggable(Level.SEVERE);
	}
	
	public boolean isFatalEnabled() {
		return log.isLoggable(Level.SEVERE);
	}
}
```

### Log4jLog
```java
public class Log4jLog extends Log {
	
	private org.apache.log4j.Logger log;
	private static final String callerFQCN = Log4jLog.class.getName();
	
	Log4jLog(Class<?> clazz) {
		log = org.apache.log4j.Logger.getLogger(clazz);
	}
	
	Log4jLog(String name) {
		log = org.apache.log4j.Logger.getLogger(name);
	}
	
	public static Log4jLog getLog(Class<?> clazz) {
		return new Log4jLog(clazz);
	}
	
	public static Log4jLog getLog(String name) {
		return new Log4jLog(name);
	}
	
	public void info(String message) {
		log.log(callerFQCN, Level.INFO, message, null);
	}
	
	public void info(String message, Throwable t) {
		log.log(callerFQCN, Level.INFO, message, t);
	}
	
	public void debug(String message) {
		log.log(callerFQCN, Level.DEBUG, message, null);
	}
	
	public void debug(String message, Throwable t) {
		log.log(callerFQCN, Level.DEBUG, message, t);
	}
	
	public void warn(String message) {
		log.log(callerFQCN, Level.WARN, message, null);
	}
	
	public void warn(String message, Throwable t) {
		log.log(callerFQCN, Level.WARN, message, t);
	}
	
	public void error(String message) {
		log.log(callerFQCN, Level.ERROR, message, null);
	}
	
	public void error(String message, Throwable t) {
		log.log(callerFQCN, Level.ERROR, message, t);
	}
	
	public void fatal(String message) {
		log.log(callerFQCN, Level.FATAL, message, null);
	}
	
	public void fatal(String message, Throwable t) {
		log.log(callerFQCN, Level.FATAL, message, t);
	}
	
	public boolean isDebugEnabled() {
		return log.isDebugEnabled();
	}
	
	public boolean isInfoEnabled() {
		return log.isInfoEnabled();
	}
	
	public boolean isWarnEnabled() {
		return log.isEnabledFor(Level.WARN);
	}
	
	public boolean isErrorEnabled() {
		return log.isEnabledFor(Level.ERROR);
	}
	
	public boolean isFatalEnabled() {
		return log.isEnabledFor(Level.FATAL);
	}
}
```
到目前为止，其实已经可以用Log了，我们来测试测试，先写log4j.properties配置文件：
```
log4j.rootLogger = INFO, stdout, file

log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern =%n%-d{yyyy-MM-dd HH:mm:ss}%n[%p]-[Thread: %t]-[%C.%M()]: %n%m%n

log4j.appender.file = org.apache.log4j.FileAppender
log4j.appender.file.file = ../jfinal_demo.log
log4j.appender.file.layout = org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%n%-d{yyyy-MM-dd HH:mm:ss}%n[%p]-[Thread: %t]-[%C.%M()]: %n%m%n
```
测试代码：
```java
public class ILogFactoryTest {

    private Log log;

    @Before
    public void before() {
        ILogFactory factory = new Log4jLogFactory();
        log = factory.getLog(ILogFactoryTest.class);
    }

    @Test
    public void test1() {
		log.info("ILogFactoryTest info: " + log.isInfoEnabled());
        log.debug("ILogFactoryTest debug: " + log.isDebugEnabled());
        log.warn("ILogFactoryTest warn: " + log.isWarnEnabled());
        log.error("ILogFactoryTest error: " + log.isErrorEnabled());
        log.fatal("ILogFactoryTest fatal: " + log.isFatalEnabled());
    }

    @Test
    public void test2() {
        log.info("ILogFactoryTest -> shenjinxiang!");
        log.debug("ILogFactoryTest -> shenjinxiang!");
        log.warn("ILogFactoryTest -> shenjinxiang!");
        log.error("ILogFactoryTest -> shenjinxiang!");
        log.fatal("ILogFactoryTest -> shenjinxiang!");
    }
}
```
运行结果：
```
2018-07-18 11:10:56
[INFO]-[Thread: main]-[com.shenjinxiang.jfinal_demo.log.ILogFactoryTest.test2()]: 
ILogFactoryTest -> shenjinxiang!

2018-07-18 11:10:56
[WARN]-[Thread: main]-[com.shenjinxiang.jfinal_demo.log.ILogFactoryTest.test2()]: 
ILogFactoryTest -> shenjinxiang!

2018-07-18 11:10:56
[ERROR]-[Thread: main]-[com.shenjinxiang.jfinal_demo.log.ILogFactoryTest.test2()]: 
ILogFactoryTest -> shenjinxiang!

2018-07-18 11:10:56
[FATAL]-[Thread: main]-[com.shenjinxiang.jfinal_demo.log.ILogFactoryTest.test2()]: 
ILogFactoryTest -> shenjinxiang!

2018-07-18 11:10:56
[INFO]-[Thread: main]-[com.shenjinxiang.jfinal_demo.log.ILogFactoryTest.test1()]: 
ILogFactoryTest info: true

2018-07-18 11:10:56
[WARN]-[Thread: main]-[com.shenjinxiang.jfinal_demo.log.ILogFactoryTest.test1()]: 
ILogFactoryTest warn: true

2018-07-18 11:10:56
[ERROR]-[Thread: main]-[com.shenjinxiang.jfinal_demo.log.ILogFactoryTest.test1()]: 
ILogFactoryTest error: true

2018-07-18 11:10:56
[FATAL]-[Thread: main]-[com.shenjinxiang.jfinal_demo.log.ILogFactoryTest.test1()]: 
ILogFactoryTest fatal: true
```
可以看到，打印出来预期的效果，如果需要改变实际使用的log工具，比如使用JdkLog，则需要将`ILogFactory factory = new Log4jLogFactory();`改为`ILogFactory factory = new JdkLogFactory();`，其他代码不需要改动。
但是这样还是比较麻烦，每次用到日志的地方都指定一次工厂。 而且，对于一个系统来说，最好是指定统一的日志工具，在JFinal的`com.jfinal.log.Log`中，有一个`defaultLogFactory`用于记录默认的日志工厂:
```java
private static ILogFactory defaultLogFactory = null;

static {
	init();
}

static void init() {
	if (defaultLogFactory == null) {
		try {
			Class.forName("org.apache.log4j.Logger");
			Class<?> log4jLogFactoryClass = Class.forName("com.jfinal.log.Log4jLogFactory");
			defaultLogFactory = (ILogFactory)log4jLogFactoryClass.newInstance();	// return new Log4jLogFactory();
		} catch (Exception e) {
			defaultLogFactory = new JdkLogFactory();
		}
	}
}

static void setDefaultLogFactory(ILogFactory defaultLogFactory) {
	if (defaultLogFactory == null) {
		throw new IllegalArgumentException("defaultLogFactory can not be null.");
	}
	Log.defaultLogFactory = defaultLogFactory;
}

public static Log getLog(Class<?> clazz) {
	return defaultLogFactory.getLog(clazz);
}

public static Log getLog(String name) {
	return defaultLogFactory.getLog(name);
}
```
这样，我可以直接操作Log类即可了：
```
public class LogTest {

    @Test
    public void test() {
        Log log = Log.getLog(LogTest.class);
        log.info("LogTest -> shenjinxiang");
    }
}
```
Log中设置了一个`defaultLogFactory`作为默认日志工厂，以及相应的初始化和setter方法。需要注意的是`setDefaultLogFactory`的访问权限，外部是没法直接调用的，为什么要这样做呢？因为`LogKit`。

### LogKit
```java
public class LogKit {
	
	private static class Holder {
		private static Log log = Log.getLog(LogKit.class);
	}
	
	/**
	 * 当通过 Constants.setLogFactory(...) 或者 
	 * LogManager.me().setDefaultLogFacotyr(...)
	 * 指定默认日志工厂以后，重置一下内部 Log 对象，以便使内部日志实现与系统保持一致
	 */
	public static void synchronizeLog() {
		Holder.log = Log.getLog(LogKit.class);
	}
	
	/**
	 * Do nothing.
	 */
	public static void logNothing(Throwable t) {
		
	}
	
	public static void debug(String message) {
		Holder.log.debug(message);
	}
	
	public static void debug(String message, Throwable t) {
		Holder.log.debug(message, t);
	}
	
	public static void info(String message) {
		Holder.log.info(message);
	}
	
	public static void info(String message, Throwable t) {
		Holder.log.info(message, t);
	}
	
	public static void warn(String message) {
		Holder.log.warn(message);
	}
	
	public static void warn(String message, Throwable t) {
		Holder.log.warn(message, t);
	}
	
	public static void error(String message) {
		Holder.log.error(message);
	}
	
	public static void error(String message, Throwable t) {
		Holder.log.error(message, t);
	}
	
	public static void fatal(String message) {
		Holder.log.fatal(message);
	}
	
	public static void fatal(String message, Throwable t) {
		Holder.log.fatal(message, t);
	}
	
	public static boolean isDebugEnabled() {
		return Holder.log.isDebugEnabled();
	}
	
	public static boolean isInfoEnabled() {
		return Holder.log.isInfoEnabled();
	}
	
	public static boolean isWarnEnabled() {
		return Holder.log.isWarnEnabled();
	}
	
	public static boolean isErrorEnabled() {
		return Holder.log.isErrorEnabled();
	}
	
	public static boolean isFatalEnabled() {
		return Holder.log.isFatalEnabled();
	}
}
```
可以看到`LogKit`中所有方法都是静态的，可以直接使用，这里使用了静态内部类`Holder`，保证了通过`LogKit`打印日志使用的`log`是唯一实例。客户端使用的时候，不需要再次创建`Log`实例。

测试代码如下；
```java
@Test
public void test() {
	LogKit.info("LogKitTest -> shenjinxiang!");
	LogKit.debug("LogKitTest -> shenjinxiang!");
	LogKit.warn("LogKitTest -> shenjinxiang!");
	LogKit.error("LogKitTest -> shenjinxiang!");
	LogKit.fatal("LogKitTest -> shenjinxiang!");
}
```
看看日志：
```
2018-07-18 11:42:27
[INFO]-[Thread: main]-[com.jfinal.log.LogKit.info()]: 
LogKitTest -> shenjinxiang!

2018-07-18 11:42:27
[WARN]-[Thread: main]-[com.jfinal.log.LogKit.warn()]: 
LogKitTest -> shenjinxiang!

2018-07-18 11:42:27
[ERROR]-[Thread: main]-[com.jfinal.log.LogKit.error()]: 
LogKitTest -> shenjinxiang!

2018-07-18 11:42:27
[FATAL]-[Thread: main]-[com.jfinal.log.LogKit.fatal()]: 
LogKitTest -> shenjinxiang!
```

在`LogKit`中还有一个特殊方法`synchronizeLog()`，用来进行同步操作，为什么要这样呢？比如我们开始的时候用`LogKit`做了一些打印工作了，此时的`Holder.log`是通过`Log`中的`defaultLogFactory`创建的。在后续的程序运行中，如果有人使用了`Log.setDefaultLogFacotyr()`将`defaultLogFactory`设置成其他的`ILogFactory`，这样就与`LogKit`不统一了，为了保证与系统整体保持一直，就需要进行同步操作。由此，我们需要一个管理器，同时管理Log中的默认日志工厂和`LogKit`中的`Holder.log`。

### LogManager
```java
package com.jfinal.log;

/**
 * LogManager.
 */
public class LogManager {
	
	private static final LogManager me = new LogManager();
	
	private LogManager() {}
	
	public static LogManager me() {
		return me;
	}
	
	public void init() {
		Log.init();
	}
	
	public void setDefaultLogFactory(ILogFactory defaultLogFactory) {
		Log.setDefaultLogFactory(defaultLogFactory);
		com.jfinal.kit.LogKit.synchronizeLog();
	}
}
```
作为整个JFinal 中log系统的管理器，`LogManager`是单例模式，同时提供了`Log`的初始化，以及设置`defaultLogFactory`的工作。将`Log.setDefaultLogFactory()`设置为包访问权限。所以需要设置`defaultLogFactory`只能通过`LogManager`来实现。

至此，Jfinal 中日志系统阅读完毕。

* 对日志系统初始化：

```java
LogManager.me().init();
```
这部分工作在`com.jfinal.core.Config`类中进行。

* 打印日志信息

```java
// 方式1，不关心打印日志的类、方法等信息
LogKit.info(message);

// 方式2，需要显示打印日志的类、方法信息
Log log = Log.getLog(clazz);
log.info(message)
```
