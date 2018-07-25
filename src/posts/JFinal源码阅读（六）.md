id: 73
title: JFinal源码阅读（六）
date: 2018-07-25
category: java
tags: java, jfinal
description: 按照初始化顺序，开始阅读路由相关的内容，JFinal 中路由关系到访问路径和控制层、视图层，涉及到的范围比较大，需要分层次阅读

------
按照初始化顺序，开始阅读路由相关的内容，JFinal 中路由关系到访问路径和控制层、视图层，涉及到的范围比较大，需要分层次阅读，按照代码执行顺序，整个过程分为三个部分：
1. 加载`JFinalConfig`中通过`configRoutes`配置的路由信息；
2. 将配置的路由信息初始化成`ActionMapping`；
3. 客户端每次访问时根据`ActionMapping`创建对应的`Action，渲染视图

这里先说第一部分，加载`JFinalConfig`中通过`configRoutes`配置的路由信息
```java
class Config {
	private static final Routes routes = new Routes() {
		public void config() {}
	}

	static void configJFinal(JFinalConfig jfinalConfig) {
		jfinalConfig.configRoute(routes);
		// 其他代码
	}
}
```
`JFinalConfig`中配置的路由信息都保存在`routes`对象上，接下来看`Routes`的代码

### Routes私有域
```java
public abstract class Routes {
	private static List<Routes> routesList = new ArrayList<Routes>();
	private static Set<String> controllerKeySet = new HashSet<String>();

	private String baseViewPath = null;
	private List<Route> routeItemList = new ArrayList<Route>();
	private List<Interceptor> injectInters = new ArrayList<Interceptor>();

	private boolean clearAfterMapping = true;

	// ...
}
```
代码比较多，分布阅读，先列出来`Routes`的一些私有域信息：
* routesList : 拆分配置路由时，新增的`Routes`对象保存在这个列表中
* controllerKeySet : 所有控制器对应的`key`都在此处，且不重复
* baseViewPath : 当前`routes`的基础视图路径
* routeItemList : 当前`routes`中包含的路由
* injectInters: 当前`routes`上配置的拦截器列表
* clearAfterMapping : 是否可以清除加载的路由数据

### 根路由上配置Routes
JFinal 路由系统可以进行拆分配置，这对大规模团队开发十分有用，代码方面，`Routes`上可以继续添加`Routes`，这样就有了层次，而将`routesList`声明为静态的，所有配置的`routes`都在`routesList`中保存
```java
public Routes add(Routes routes) {
	routes.config();
	routesList.add(routes);
	return this;
}
public static List<Routes> getRoutesList() {
	return routesList;
}
```
这里有个`config()`方法，用于配置参数中`routes`的路由、拦截器以及`baseViewPath`信息：
```java
public abstract void config();
```
很显然，如果要给`Config`类中的`routes`再配置`routes`，就必须实现这个方法。

### Route
`Route`表示一个路由，代码中是`Routes`类的静态内部类，下面是路由的私有域：
```java
public static class Route {
		
	private String controllerKey;
	private Class<? extends Controller> controllerClass;
	private String viewPath;
	
	// 其他代码
}
```
三个私有域，分别表示控制器`key`（需要通过`key`找到对应的控制器）、控制器、视图路径

**初始化**
```java
public Route(String controllerKey, Class<? extends Controller> controllerClass, String viewPath) {
	if (StrKit.isBlank(controllerKey)) {
		throw new IllegalArgumentException("controllerKey can not be blank");
	}
	if (controllerClass == null) {
		throw new IllegalArgumentException("controllerClass can not be null");
	}
	if (StrKit.isBlank(viewPath)) {
		// throw new IllegalArgumentException("viewPath can not be blank");
		viewPath = "/";
	}
	
	this.controllerKey = processControllerKey(controllerKey);
	this.controllerClass = controllerClass;
	this.viewPath = processViewPath(viewPath);
}

private String processControllerKey(String controllerKey) {
	controllerKey = controllerKey.trim();
	if (!controllerKey.startsWith("/")) {
		controllerKey = "/" + controllerKey;
	}
	if (controllerKeySet.contains(controllerKey)) {
		throw new IllegalArgumentException("controllerKey already exists: " + controllerKey);
	}
	controllerKeySet.add(controllerKey);
	return controllerKey;
}

private String processViewPath(String viewPath) {
	viewPath = viewPath.trim();
	if (!viewPath.startsWith("/")) {			// add prefix "/"
		viewPath = "/" + viewPath;
	}
	if (!viewPath.endsWith("/")) {				// add postfix "/"
		viewPath = viewPath + "/";
	}
	return viewPath;
}
```
对`controllerKey`和`viewPath`分别进行字符串处理，针对`controllerKey`，会进行去重检查，并记录在静态域`controllerKeySet`中。另外，这里涉及到一个工具类`StrKit`:
```java
public class StrKit {
	public static boolean isBlank(String str) {
		if (str == null) {
			return true;
		}
		int len = str.length();
		if (len == 0) {
			return true;
		}
		for (int i = 0; i < len; i++) {
			switch (str.charAt(i)) {
			case ' ':
			case '\t':
			case '\n':
			case '\r':
				break;
			default:
				return false;
			}
		}
		return true;
	}
	
	public static boolean notBlank(String str) {
		return !isBlank(str);
	}
}
```
`isBlank`和`notBlank`分别用于判断字符串是否为空。

**公开的方法**

```java
public String getControllerKey() {
	return controllerKey;
}

public Class<? extends Controller> getControllerClass() {
	return controllerClass;
}

public String getFinalViewPath(String baseViewPath) {
	return baseViewPath != null ? baseViewPath + viewPath : viewPath;
}
```

### Routes添加路由
```java
public Routes add(String controllerKey, Class<? extends Controller> controllerClass, String viewPath) {
	routeItemList.add(new Route(controllerKey, controllerClass, viewPath));
	return this;
}

public Routes add(String controllerKey, Class<? extends Controller> controllerClass) {
	return add(controllerKey, controllerClass, controllerKey);
}
```
添加路由即创建一个`Route`对象，将该对象保存至`Routes`类的静态域`routeItemList`中，该对象的`controllerKey`保存到静态域`controllerKeySet`中。

### baseViewPath操作
```java
public Routes setBaseViewPath(String baseViewPath) {
	if (StrKit.isBlank(baseViewPath)) {
		throw new IllegalArgumentException("baseViewPath can not be blank");
	}
	
	baseViewPath = baseViewPath.trim();
	if (! baseViewPath.startsWith("/")) {			// add prefix "/"
		baseViewPath = "/" + baseViewPath;
	}
	if (baseViewPath.endsWith("/")) {				// remove "/" in the end of baseViewPath
		baseViewPath = baseViewPath.substring(0, baseViewPath.length() - 1);
	}
	
	this.baseViewPath = baseViewPath;
	return this;
}

public String getBaseViewPath() {
	return baseViewPath;
}
```

### Routes配置拦截器
```java
public Routes addInterceptor(Interceptor interceptor) {
	injectInters.add(interceptor);
	return this;
}
```
`Routes`上可以配置拦截器，JFinal 可以拆分配置路由，同样可以给不同的路由配置不同的拦截器，设置更细化、更灵活。拦截器相关内容，后续会涉及。

### 清空相关
按照开始说的三个步骤，记录好配置的路由信息以后，初始化成`ActionMapping`，此后，配置的信息已读取完毕，没什么用处了，释放掉这些对象还是有必要的：
```java
public void setClearAfterMapping(boolean clearAfterMapping) {
	this.clearAfterMapping = clearAfterMapping;
}

public void clear() {
	if (clearAfterMapping) {
		routesList = null;
		controllerKeySet = null;
		baseViewPath = null;
		routeItemList = null;
		injectInters = null;
	}
}
```

### 其他方法
```java
public static List<Routes> getRoutesList() {
	return routesList;
}

public List<Route> getRouteItemList() {
	return routeItemList;
}

public Interceptor[] getInterceptors() {
	return injectInters.size() > 0 ?
			injectInters.toArray(new Interceptor[injectInters.size()]) :
			InterceptorManager.NULL_INTERS;
}
```
