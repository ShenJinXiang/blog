id: 72
title: JFinal源码阅读（五）
date: 2018-07-21
category: java
tags: java, jfinal
description: 今天说一说JFinal中的插件系统，JFinal的插件系统比较简单，服务器在启动的时候加载用户配置的插件列表，进行初始化工作；当服务器关闭的时候，再对插件列表进行关闭工作。

------
今天说一说JFinal中的插件系统，JFinal的插件系统比较简单，服务器在启动的时候加载用户配置的插件列表，进行初始化工作；当服务器关闭的时候，再对插件列表进行关闭工作。详细来说一共分`4`个步骤：
1. 配置并保存插件列表
2. 配置JFinal加载插件的顺序
3. 依次加载插件
4. 服务器关闭的时候，依次关闭插件

其中，JFinal的使用者需要做的工作是配置插件列表，插件的来源可以是自己实现，也可以使用JFinal框架提供的一些插件，这个是根据项目实际情况处理的。插件的核心主要是一个接口：`IPlugin`。

### IPlugin
```java
package com.jfinal.plugin;

public interface IPlugin {
	boolean start();
	boolean stop();
}
```
在 JFinal 中所有的插件都需要实现`IPlugin`接口，即实现`start()`和`stop()`方法。

### 配置并保存插件列表
配置插件列表的地方就在JFinalConfig类中：
```java
public abstract class JFinalConfig {
	/**
	 * Config plugin
	 */
	public abstract void configPlugin(Plugins plugins);
}
```
找到插件以后，通过实现`configPlugin()`方法，使用`plugins.add()`即可。插件的保存工作则在`Plugins`类中：

```java
package com.jfinal.config;

import java.util.ArrayList;
import java.util.List;
import com.jfinal.plugin.IPlugin;

final public class Plugins {
	
	private final List<IPlugin> pluginList = new ArrayList<IPlugin>();
	
	public Plugins add(IPlugin plugin) {
		if (plugin == null) {
			throw new IllegalArgumentException("plugin can not be null");
		}
		pluginList.add(plugin);
		return this;
	}
	
	public List<IPlugin> getPluginList() {
		return pluginList;
	}
}
```

### 配置JFinal加载插件的顺序
配置插件加载顺序也是在JFinalConfig中，前面的阅读中也提到过。
```java
public abstract class JFinalConfig {
	/**
	 * Config constant
	 */
	public abstract void configConstant(Constants constants);
```
在`Constants`中相关代码：
```java
private int configPluginOrder = Const.DEFAULT_CONFIG_PLUGIN_ORDER;

public void setConfigPluginOrder(int configPluginOrder) {
	if (configPluginOrder < 1 || configPluginOrder > 5) {
		throw new IllegalArgumentException("configPluginOrder 只能取值为：1、2、3、4、5");
	}
	this.configPluginOrder = configPluginOrder;
}

public int getConfigPluginOrder() {
	return configPluginOrder;
}
```
加载顺序默认为`2`，在实现`JFinalConfig.configConstant()`方法的时候，通过`configConstant.setConfigPluginOrder()`即可设置JFinal加载插件的顺序。

### 依次加载插件
加载工作在`Config`中进行：
```java
class Config {
	private static final Plugins plugins = new Plugins();
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

	private static void configPluginWithOrder(int order, JFinalConfig jfinalConfig) {
		if (order == constants.getConfigPluginOrder()) {
			jfinalConfig.configPlugin(plugins);
			startPlugins();		// very important!!!
		}
	}
}
```
在`configPluginWithOrder()`方法中，获取到配置的插件列表，保存在`Plugins`类的`pluginList`域中。`startPlugins()`启动所有配置的插件:

```java
private static void startPlugins() {
	List<IPlugin> pluginList = plugins.getPluginList();
	if (pluginList == null) {
		return ;
	}
	
	for (IPlugin plugin : pluginList) {
		try {
			// process ActiveRecordPlugin devMode
			if (plugin instanceof com.jfinal.plugin.activerecord.ActiveRecordPlugin) {
				com.jfinal.plugin.activerecord.ActiveRecordPlugin arp = (com.jfinal.plugin.activerecord.ActiveRecordPlugin)plugin;
				if (arp.getDevMode() == null) {
					arp.setDevMode(constants.getDevMode());
				}
			}
			
			if (plugin.start() == false) {
				String message = "Plugin start error: " + plugin.getClass().getName();
				log.error(message);
				throw new RuntimeException(message);
			}
		}
		catch (Exception e) {
			String message = "Plugin start error: " + plugin.getClass().getName() + ". \n" + e.getMessage();
			log.error(message, e);
			throw new RuntimeException(message, e);
		}
	}
}
```
代码中关于`com.jfinal.plugin.activerecord.ActiveRecordPlugin`的部分可以先不忽略，这是JFinal dao层的部分，设置其是否开发模式。这个方法简单说来就是循环执行每个插件的`start()`方法。

### 服务器关闭的时候，依次关闭插件
服务器关闭的时候的业务，必然是通过`JFinalFilter`的`destroy()`执行的；
```java
public class JFinalFilter implements Filter {
	public void destroy() {
		// 其他代码
		jfinal.stopPlugins();
	}
}
```
再来看`jfinal.stopPlugins()`方法；
```java
void stopPlugins() {
	List<IPlugin> plugins = Config.getPlugins().getPluginList();
	if (plugins != null) {
		for (int i=plugins.size()-1; i >= 0; i--) {		// stop plugins
			boolean success = false;
			try {
				success = plugins.get(i).stop();
			} 
			catch (Exception e) {
				success = false;
				LogKit.error(e.getMessage(), e);
			}
			if (!success) {
				System.err.println("Plugin stop error: " + plugins.get(i).getClass().getName());
			}
		}
	}
}
```
这样理清除JFinal 中插件的配置、加载、关闭等部分。再次做个总结：
* 插件必须实现`IPlugin`接口
* 每个插件的启动和关闭方法都是返回布尔类型，true表示成功，false表示失败
* 启动和关闭插件列表的方法的可访问性分别为私有和包级私有的，外部是不可能调用的
* 通过实现JFinalConfig中的`configConstant()`方法配置插件在JFinal所有加载项中的加载顺序
* 通过实现JFinalConfig中的`configPlugin()`方法配置插件列表，插件之间的启动顺序是按照添加到列表的先后次序启动
* 插件的启动顺序和关闭顺序是相反的，即先加载的插件最后关闭
* JFinal 提供了好多实用插件的实现
