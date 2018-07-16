id: 70
title: JFinal源码阅读（三）
date: 2018-07-16
category: java
tags: java, jfinal
description: 从之前阅读的代码可以知道，JFinal 启动以后首先加载的就是项目中常量的设置。主要涉及到两个类：com.jfinal.core.Const和com.jfinal.config.Constants

------
从之前阅读的代码可以知道，JFinal 启动以后首先加载的就是项目中常量的设置。主要涉及到两个类：`com.jfinal.core.Const`和`com.jfinal.config.Constants`

### 常量默认值
Const中定义了项目中常量的默认值：
```java
public interface Const {
	
	String JFINAL_VERSION = "3.4";
	
	ViewType DEFAULT_VIEW_TYPE = ViewType.JFINAL_TEMPLATE;
	
	String DEFAULT_BASE_UPLOAD_PATH = "upload";
	
	String DEFAULT_BASE_DOWNLOAD_PATH = "download";
	
	String DEFAULT_ENCODING = "UTF-8";
	
	boolean DEFAULT_DEV_MODE = false;
	
	String DEFAULT_URL_PARA_SEPARATOR = "-";
	
	String DEFAULT_VIEW_EXTENSION = ".html";
	
	int DEFAULT_MAX_POST_SIZE = 1024 * 1024 * 10;  			// Default max post size of multipart request: 10 Meg
	
	int DEFAULT_I18N_MAX_AGE_OF_COOKIE = 999999999;
	
	int DEFAULT_FREEMARKER_TEMPLATE_UPDATE_DELAY = 3600;	// For not devMode only
	
	String DEFAULT_TOKEN_NAME = "_jfinal_token";
	
	int DEFAULT_SECONDS_OF_TOKEN_TIME_OUT = 900;			// 900 seconds ---> 15 minutes
	
	int MIN_SECONDS_OF_TOKEN_TIME_OUT = 300;				// 300 seconds ---> 5 minutes
	
	int DEFAULT_CONFIG_PLUGIN_ORDER = 2;
	
	ControllerFactory DEFAULT_CONTROLLER_FACTORY = new ControllerFactory();
}
```

### 设置常量
在`com.jfinal.core.Config`中有如下代码：
```java
private static final Constants constants = new Constants();

static void configJFinal(JFinalConfig jfinalConfig) {
	jfinalConfig.configConstant(constants);
	// ...
}
```
也就是说，实现`JFinalConfig.configJFinal()`方法的时候，可以执行任何`Constants`中公开的方法进行项目设置。


**是否开发模式 devMode**
```java
private boolean devMode = Const.DEFAULT_DEV_MODE;

/**
 * Set development mode.
 * @param devMode the development mode
 */
public void setDevMode(boolean devMode) {
	this.devMode = devMode;
}

public boolean getDevMode() {
	return devMode;
}
```
是否开发模式，一般是用来判断是否要打印某些*日志*信息或抛出*异常*的处理方案。例如如果开启了开发这模式，客户端访问服务端时会打印访问路径对应的`Controller`方法，请求参数等信息。

**文件上传下载目录**
```java
private String baseUploadPath = Const.DEFAULT_BASE_UPLOAD_PATH;
private String baseDownloadPath = Const.DEFAULT_BASE_DOWNLOAD_PATH;

/**
 * Set file base upload path.
 * 设置文件上传保存基础路径，当路径以 "/" 打头或是以 windows 磁盘盘符打头，
 * 则将路径设置为绝对路径，否则路径将是以应用根路径为基础的相对路径
 * <pre>
 * 例如：
 * 1：参数 "/var/www/upload" 为绝对路径，上传文件将保存到此路径之下
 * 2：参数 "upload" 为相对路径，上传文件将保存到 PathKit.getWebRoot() + "/upload" 路径之下
 * </pre>
 */
public void setBaseUploadPath(String baseUploadPath) {
	if (StrKit.isBlank(baseUploadPath)) {
		throw new IllegalArgumentException("baseUploadPath can not be blank.");
	}
	this.baseUploadPath = baseUploadPath;
}

public String getBaseUploadPath() {
	return baseUploadPath;
}
	
/**
 * Set file base download path for Controller.renderFile(...)
 * 设置文件下载基础路径，当路径以 "/" 打头或是以 windows 磁盘盘符打头，
 * 则将路径设置为绝对路径，否则路径将是以应用根路径为基础的相对路径
 * <pre>
 * 例如：
 * 1：参数 "/var/www/download" 为绝对路径，下载文件存放在此路径之下
 * 2：参数 "download" 为相对路径，下载文件存放在 PathKit.getWebRoot() + "/download" 路径之下
 * </pre>
 */
public void setBaseDownloadPath(String baseDownloadPath) {
	if (StrKit.isBlank(baseDownloadPath)) {
		throw new IllegalArgumentException("baseDownloadPath can not be blank.");
	}
	this.baseDownloadPath = baseDownloadPath;
}

public String getBaseDownloadPath() {
	return baseDownloadPath;
}
```
这个没啥说的，注释里面已经很明白了。

**编码格式**
```java
private String encoding = Const.DEFAULT_ENCODING;

/**
 * Set encoding. The default encoding is UTF-8.
 * @param encoding the encoding
 */
public void setEncoding(String encoding) {
	if (StrKit.isBlank(encoding)) {
		throw new IllegalArgumentException("encoding can not be blank.");
	}
	this.encoding = encoding;
}

public String getEncoding() {
	return encoding;
}
```
设置编码格式，一般用于处理请求和响应的编码,比如`com.jfinal.core.JFinalFilter`中：
```java
private String encoding;

public void init(FilterConfig filterConfig) throws ServletException {
	// ...
	constants = Config.getConstants();
	encoding = constants.getEncoding();
	// ...
}

public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
	HttpServletRequest request = (HttpServletRequest)req;
	HttpServletResponse response = (HttpServletResponse)res;
	request.setCharacterEncoding(encoding);
	// ...
}
```

**视图类型**
```java
private ViewType viewType = Const.DEFAULT_VIEW_TYPE;

public ViewType getViewType() {
	return viewType;
}

/**
 * Set view type. The default value is ViewType.JFINAL_TEMPLATE
 * Controller.render(String view) will use the view type to render the view.
 * @param viewType the view type 
 */
public void setViewType(ViewType viewType) {
	if (viewType == null) {
		throw new IllegalArgumentException("viewType can not be null");
	}
	this.viewType = viewType;
}
```
设置视图类型，`ViewType`是枚举类型:
```java
public enum ViewType {
	JFINAL_TEMPLATE,
	JSP,
	FREE_MARKER,
	VELOCITY;
}
```

**视图后缀**
```java
private String viewExtension = Const.DEFAULT_VIEW_EXTENSION;

public String getViewExtension() {
	return viewExtension;
}

/**
 * Set view extension for the IRenderFactory.getDefaultRender(...)
 * The default value is ".html"
 * 
 * Example: ".html" or ".ftl"
 * @param viewExtension the extension of the view, it must start with dot char "."
 */
public void setViewExtension(String viewExtension) {
	this.viewExtension = viewExtension.startsWith(".") ? viewExtension : "." + viewExtension;
}
```

**上传文件大小**
```java
private int maxPostSize = Const.DEFAULT_MAX_POST_SIZE;

public int getMaxPostSize() {
	return maxPostSize;
}

/**
 * Set max size of http post. The upload file size depend on this value.
 */
public void setMaxPostSize(int maxPostSize) {
	this.maxPostSize = maxPostSize;
}
```

**控制器**
```java
private ControllerFactory controllerFactory = Const.DEFAULT_CONTROLLER_FACTORY;

public void setControllerFactory(ControllerFactory controllerFactory) {
	if (controllerFactory == null) {
		throw new IllegalArgumentException("controllerFactory can not be null.");
	}
	this.controllerFactory = controllerFactory;
}

public ControllerFactory getControllerFactory() {
	return controllerFactory;
}
```
当客户端访问时，根据`JFinalConfig.configRoute()`方法配置的路由，创建对于的`Controller`对象。

**插件加载顺序**
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
JFinal 启动时，插件加载顺序，之前提到过。

**Token缓存**
```java
private ITokenCache tokenCache = null;

/**
 * Set ITokenCache implementation otherwise JFinal will use the HttpSesion to hold the token.
 * @param tokenCache the token cache
 */
public void setTokenCache(ITokenCache tokenCache) {
	this.tokenCache = tokenCache;
}

public ITokenCache getTokenCache() {
	return tokenCache;
}
```

**错误页面**
```java
private Map<Integer, String> errorViewMapping = new HashMap<Integer, String>();
	
/**
 * Set error 404 view.
 * @param error404View the error 404 view
 */
public void setError404View(String error404View) {
	errorViewMapping.put(404, error404View);
}

/**
 * Set error 500 view.
 * @param error500View the error 500 view
 */
public void setError500View(String error500View) {
	errorViewMapping.put(500, error500View);
}

/**
 * Set error 401 view.
 * @param error401View the error 401 view
 */
public void setError401View(String error401View) {
	errorViewMapping.put(401, error401View);
}

/**
 * Set error 403 view.
 * @param error403View the error 403 view
 */
public void setError403View(String error403View) {
	errorViewMapping.put(403, error403View);
}

public void setErrorView(int errorCode, String errorView) {
	errorViewMapping.put(errorCode, errorView);
}

public String getErrorView(int errorCode) {
	return errorViewMapping.get(errorCode);
}
```

**其他**
还有一些其他的设置，比如：`renderFactory`、`jsonFactory`、`jsonDatePattern`、`captchaCache`、`logFactory`等，后面会慢慢单独展开。
