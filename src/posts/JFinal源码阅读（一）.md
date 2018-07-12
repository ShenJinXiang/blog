id: 68
title: JFinal源码阅读（一）
date: 2018-07-12
category: java
tags: java, jfinal
description: 在开始源代码之前，按官方说明，写最简单的程序让项目跑起来！

------
在开始源代码之前，按官方说明，写最简单的程序让项目跑起来！

### 目录结构
```
|-- src
|   └-- com
|       └-- shenjinxiang
|           |-- config
|           |   └-- Start.java
|           └-- controllers
|               └-- MainController.java
└-- web
    |-- index.jsp
    └-- WEB-INF
        └-- lib
        |   |-- jetty-server-8.1.8.jar
        |   └-- jfinal-3.4-bin-with-src.jar
        └-- web.xml
```

### 配置jfinal过滤器
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <filter>
        <filter-name>jfinal</filter-name>
        <filter-class>com.jfinal.core.JFinalFilter</filter-class>
        <init-param>
            <param-name>configClass</param-name>
            <param-value>com.shenjinxiang.config.Start</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>jfinal</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

### 控制层
```java
package com.shenjinxiang.controllers;

import com.jfinal.core.Controller;

public class MainController extends Controller {

    public void index() {
        renderText("Hello World!");
    }

    public void sayHi() {
        String name = getPara("name");
        renderText("嗨，" + name + "！");
    }
}
```

### 项目配置及启动类
项目配置类，需与`web.xml`中配置的jfinal过滤器中，`param-value`中一样，且必须继承并实现`com.jfinal.config.JFinalConfig`的所有抽象方法。是整个项目中除`web.xml`外，最主要的文件。
```java
package com.shenjinxiang.config;

import com.jfinal.config.*;
import com.jfinal.core.JFinal;
import com.jfinal.template.Engine;
import com.shenjinxiang.controllers.MainController;

public class Start extends JFinalConfig {

    @Override
    public void configConstant(Constants me) {
        me.setDevMode(true);
    }

    @Override
    public void configRoute(Routes me) {
        me.add("/", MainController.class);
    }

    @Override
    public void configEngine(Engine me) {

    }

    @Override
    public void configPlugin(Plugins me) {

    }

    @Override
    public void configInterceptor(Interceptors me) {

    }

    @Override
    public void configHandler(Handlers me) {

    }

    public static void main(String[] args) {
        JFinal.start("web", 8080, "/");
    }
}
```

### 启动项目
运行`com.shenjinxiang.config.Start`类中的`main`方法，控制台输出内容：
```
Starting JFinal 3.4
Starting web server on port: 8080
Starting Complete. Welcome To The JFinal World :)
```

浏览器中访问：`http://localhost:8080`，显示：
```
Hello World!
```

查看后台控制台内容：
```
JFinal-3.4 action report -------- 2018-07-10 09:12:06 --------------------------
Url         : GET /
Controller  : com.shenjinxiang.controllers.MainController.(MainController.java:1)
Method      : index
--------------------------------------------------------------------------------
```

浏览器中访问：`http://localhost:8080/sayHi?name=申锦祥`，显示内容：
```
嗨，申锦祥！
```

后台控制台内容：
```
JFinal-3.4 action report -------- 2018-07-10 09:15:41 --------------------------
Url         : GET /sayHi
Controller  : com.shenjinxiang.controllers.MainController.(MainController.java:1)
Method      : sayHi
Parameter   : name=申锦祥  
--------------------------------------------------------------------------------
```

### 备注
如果使用的开发环境是`Intellij IEAD`，启动项目后，浏览器无法访问。

处理方式，修改`com.jfinal.server.JettyServerForIDEA.doStart()`方法
```
webApp.setResourceBase(webAppDir);
```
改为：
```
webApp.setResourceBase(PathKit.getWebRootPath());
```
