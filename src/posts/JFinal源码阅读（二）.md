id: 69
title: JFinal源码阅读（二）
date: 2018-07-13
category: java
tags: java, jfinal
description: 项目跑起来了，接下俩开始阅读 JFinal 源代码，先了解大体结构

------
项目跑起来了，接下俩开始阅读 JFinal 源代码，先了解大体结构

### 大体结构
<img src='/images/java/2018/07/13/01.png' width='800px' style='display:block; margin:0px auto;'>

* JFinalConfig - 提供给使用者设置web项目配置的超类
* JFinalFilter - 过滤器，配置在web.xml中，JFinal 入口
* JFinal - 负责初始化 JFinal 各组件，以及启动jetty服务等
* Config - 加载并记录JFinalConfig的实现类中设置的内容

### JFinalConfig
`com.jfinal.config.JFinalConfig`是一个抽象类，实现这个抽象类。JFinalConfig类可以分为三个部分：

**必须实现的六个方法**
```java
public abstract void configConstant(Constants me);
public abstract void configRoute(Routes me);
public abstract void configEngine(Engine me);
public abstract void configPlugin(Plugins me);
public abstract void configInterceptor(Interceptors me);
public abstract void configHandler(Handlers me);
```

* configConstant - 配置项目中一些常量，比如是否开发模式、项目采用的编码格式、视图层类型等等
* configRoute - 配置项目访问路由，即访问路径对应到某个Controlller类的某个方法，以及配置Controller级拦截器
* configEngine - 配置模板引擎
* configPlugin - 配置插件
* configInterceptor - 配置全局拦截器，包括Controller和Service上的全局拦截器
* configHandler - 配置处理器

**可以覆盖的两个方法**
```java
public void afterJFinalStart(){}
public void beforeJFinalStop(){}
```
这两个方法，分别在项目启动 JFinal 加载完成以后和项目关闭之前执行，默认的实现是空方法。

**操作properties文件的工具方法**
在设置项目参数的时候，经常要加载并读取`properties`配置文件的数据，所以 JFinal 提供了下面的方法，方便使用。
```java
protected Prop prop = null;
	
public Properties loadPropertyFile(String fileName) {
	return loadPropertyFile(fileName, Const.DEFAULT_ENCODING);
}

public Properties loadPropertyFile(String fileName, String encoding) {
	prop = new Prop(fileName, encoding);
	return prop.getProperties();
}

public Properties loadPropertyFile(File file) {
	return loadPropertyFile(file, Const.DEFAULT_ENCODING);
}

public Properties loadPropertyFile(File file, String encoding) {
	prop = new Prop(file, encoding);
	return prop.getProperties();
}

public void unloadPropertyFile() {
	this.prop = null;
}

private Prop getProp() {
	if (prop == null) {
		throw new IllegalStateException("Load propties file by invoking loadPropertyFile(String fileName) method first.");
	}
	return prop;
}

public String getProperty(String key) {
	return getProp().get(key);
}

public String getProperty(String key, String defaultValue) {
	return getProp().get(key, defaultValue);
}

public Integer getPropertyToInt(String key) {
	return getProp().getInt(key);
}

public Integer getPropertyToInt(String key, Integer defaultValue) {
	return getProp().getInt(key, defaultValue);
}

public Long getPropertyToLong(String key) {
	return getProp().getLong(key);
}

public Long getPropertyToLong(String key, Long defaultValue) {
	return getProp().getLong(key, defaultValue);
}

public Boolean getPropertyToBoolean(String key) {
	return getProp().getBoolean(key);
}

public Boolean getPropertyToBoolean(String key, Boolean defaultValue) {
	return getProp().getBoolean(key, defaultValue);
}
```
这里用到了`Prop`类，所在包为`com.jfinal.kit`，加载方式也比较简单，这里不贴代码了。

### 过滤器
对于java EE中过滤器，我们知道项目启动时会执行`init()`方法；每次访问服务器根据过滤器配置的`url-pattern`，运行`doFilter()`方法；当服务关闭时运行`destroy()`方法。所以对于以过滤器为基础的web框架整体分为三部分：
1. init() - 加载项目配置项，比如项目全局配置、路由、控制层、过滤器以及其他相关插件等
2. doFilter() - 针对客户端请求，按照配置的路由，经过过滤器到达控制层，并返回响应给客户端
3. destroy() - 释放或销毁相关对象

配置的过滤器为`com.jfinal.core.JFinalFilter`，这个类是整个 JFinal 的起点，查看相关代码：
```java
public class JFinalFilter implements Filter {
	
	private JFinalConfig jfinalConfig;
	private static final JFinal jfinal = JFinal.me();
	
	public void init(FilterConfig filterConfig) throws ServletException {
		createJFinalConfig(filterConfig.getInitParameter("configClass"));
		
		jfinal.init(jfinalConfig, filterConfig.getServletContext());
		
		// ...
		
		jfinalConfig.afterJFinalStart();

		// ...
	}
	
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		// ...
	}
	
	public void destroy() {
		// ...
		jfinalConfig.beforeJFinalStop();
		// ...
	}
	
	protected void createJFinalConfig(String configClass) {
		if (configClass == null) {
			throw new RuntimeException("Please set configClass parameter of JFinalFilter in web.xml");
		}
		
		Object temp = null;
		try {
			temp = Class.forName(configClass).newInstance();
		} catch (Exception e) {
			throw new RuntimeException("Can not create instance of class: " + configClass, e);
		}
		
		if (temp instanceof JFinalConfig) {
			jfinalConfig = (JFinalConfig)temp;
		} else {
			throw new RuntimeException("Can not create instance of class: " + configClass + ". Please check the config in web.xml");
		}
	}
	
}
```

结合之前写的例子，进行阅读：
1. 项目启动时，获取到web.xml中配置的参数`configClass`，其值为`com.shenjinxiang.config.Start`
2. 通过`createJFinalConfig()`方法创建`JFinalConfig`的实例
3. 通过`jfinal.init()`进行 JFinal 的初始化工作
4. 执行`jfinalConfig.afterJFinalStart()`做一些初始化完成以后的处理
5. 项目结束时，执行`jfinalConfig.beforeJFinalStop()`

### JFinal类
`com.jfinal.core.JFinal`类分为两部分： JFinal 初始化、jetty 服务器启动和关闭，这里只关注初始化部分
```java
public final class JFinal {
	
	private Constants constants;
	private ActionMapping actionMapping;
	private Handler handler;

	private static final JFinal me = new JFinal();

	private JFinal() { }

	public static JFinal me() {
		return me;
	}

	void init(JFinalConfig jfinalConfig, ServletContext servletContext) {
		// ...

		Config.configJFinal(jfinalConfig);
		constants = Config.getConstants();

		initActionMapping();
		initHandler();
		initRender();
		initOreillyCos();
		initTokenManager();
	}
}
```
这里涉及到`Config.configJFinal()`，所以同时看看`Config`的代码

## Config类
```java
class Config {
	
	private static final Constants constants = new Constants();
	private static final Routes routes = new Routes(){public void config() {}};
	private static final Engine engine = new Engine("JFinal Web");
	private static final Plugins plugins = new Plugins();
	private static final Interceptors interceptors = new Interceptors();
	private static final Handlers handlers = new Handlers();
	private static Log log;
	
	// prevent new Config();
	private Config() {
	}
	
	/*
	 * Config order: constant, plugin, route, engine, interceptor, handler
	 */
	static void configJFinal(JFinalConfig jfinalConfig) {
		jfinalConfig.configConstant(constants);			initLogFactory();	initEngine();
		
		configPluginWithOrder(1, jfinalConfig);
		jfinalConfig.configRoute(routes);
		
		configPluginWithOrder(2, jfinalConfig);
		jfinalConfig.configEngine(engine);
		
		configPluginWithOrder(3, jfinalConfig);
		jfinalConfig.configInterceptor(interceptors);
		
		configPluginWithOrder(4, jfinalConfig);
		jfinalConfig.configHandler(handlers);
		
		configPluginWithOrder(5, jfinalConfig);
	}
}
```
JFinal调用`com.jfinal.core.Config.configJFinal()`方法，依次加载常量、路由、模块引擎、通用拦截器、处理器。需要注意的是插件的加载顺序

```java
private static void configPluginWithOrder(int order, JFinalConfig jfinalConfig) {
    if (order == constants.getConfigPluginOrder()) {
        jfinalConfig.configPlugin(plugins);
        startPlugins();		// very important!!!
    }
}
```
在`com.jfinal.config.Constants`中可以设置插件的加载顺序：
```java
final public class Constants { 
    private int configPluginOrder = Const.DEFAULT_CONFIG_PLUGIN_ORDER;
    /**
     * 配置 configPlugin(Plugins me) 在 JFinalConfig 中被调用的次序.
     * 
     * 取值 1、2、3、4、5 分别表示在 configConstant(..)、configRoute(..)、
     * configEngine(..)、configInterceptor(..)、configHandler(...)
     * 之后被调用
     * 
     * 默认值为 2，那么 configPlugin(..) 将在 configRoute(...) 调用之后被调用
     * @param 取值只能是 1、2、3、4、5
     */
    public void setConfigPluginOrder(int configPluginOrder) {
        if (configPluginOrder < 1 || configPluginOrder > 5) {
            throw new IllegalArgumentException("configPluginOrder 只能取值为：1、2、3、4、5");
        }
        this.configPluginOrder = configPluginOrder;
    }
    
    public int getConfigPluginOrder() {
        return configPluginOrder;
    }
}
```
如果未设置，插件加载顺序的默认值为`2`，这个是在`com.jfinal.core.Const`中定义的：
```java
public interface Const {
    int DEFAULT_CONFIG_PLUGIN_ORDER = 2;
}
```

下面的阅读，就按照各组件的加载和初始化，来进行。

