id: 74
title: JFinal源码阅读（七）
date: 2018-07-28
category: java
tags: java, jfinal
description: 阅读完JFinal的路由加载保存机制，按照顺序，应该是路由配置初始化成ActionMapping，以及处理客户端访问。不过JFinal的初始化工作还没完成，还有很多其他方面的工作...

------
阅读完JFinal的路由加载保存机制，按照顺序，应该是路由配置初始化成`ActionMapping`，以及处理客户端访问。不过JFinal的初始化工作还没完成，还有很多其他方面的工作，比如处理器、拦截器、视图渲染等等，今天主要阅读JFinal的处理器部分

处理器部分代码比较简单，前提是熟悉职责链模式，所以，先熟悉职责链设计模式

### 职责链模式
#### 定义
避免请求发送者与请求接收者耦合在一起，让多个对象都有可能接收到请求，将这些请求连接成一天链，并沿着这条链传递请求，直到有对象处理它为止

<img src='/images/java/2018/07/28/01.png' width='800px' style='display:block; margin:0px auto;'>

#### 角色信息
* Handler（抽象处理者）：它定义了一个处理请求的接口，一般设计为抽象类，由于不同的具体处理者处理请求的方式不同，因此在其中定义了抽象请求处理方法。因为每一个处理者的下家还是一个处理者，因此在抽象处理者中定义了一个抽象处理者类型的对象（如结构图中的`successor`） ，作为其对下家的引用。通过该引用，处理者可以连成一条链。 
* ConcreteHandler（具体处理者）：它是抽象处理者的子类，可以处理用户请求，在具体处理者类中实现了抽象处理者中定义的抽象请求处理方法，在处理请求之前需要进行判断，看是否有相应的处理权限，如果可以处理请求就处理它，否则将请求转发给后继者；在具体处理者中可以访问链中下一个对象，以便请求的转发。

在职责链模式里，很多对象由每一个对象对其下家的引用而连接起来形成一条链。请求在这个链上传递，直到链上的某一个对象决定处理此请求。发出这个请求的客户端并不知道链上的哪一个对象最终处理这个请求，这使得系统可以在不影响客户端的情况下动态地重新组织链和分配责任

#### 代码实现
请求：
```java
public class Request {

    private String name;

    public Request(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
抽象处理者代码：
```java
public abstract class Handler {

    protected Handler successor;

    public void setSuccessor(Handler successor) {
        this.successor = successor;
    }

    public abstract void handleRequest(Request request);

}
```

具体处理者`AHandler`代码：
```java
public class AHandler extends Handler {

    private String handlerName;

    public AHandler(String handlerName) {
        this.handlerName = handlerName;
    }


    @Override
    public void handleRequest(Request request) {
        System.out.println(this + " 正在处理请求：" + request.getName());
        if (null != this.successor) {
            System.out.println("传给下一个处理者：" + this.successor);
            this.successor.handleRequest(request);
        } else {
            System.out.println("请求：[" + request.getName() + "]处理完毕");
        }
    }

    @Override
    public String toString() {
        return "AHandler " + this.handlerName;
    }
}
```

具体处理者`BHandler`代码：
```java
public class BHandler extends Handler {

    private String handlerName;

    public BHandler(String handlerName) {
        this.handlerName = handlerName;
    }


    @Override
    public void handleRequest(Request request) {
        System.out.println(this + " 正在处理请求：" + request.getName());
        if (null != this.successor) {
            System.out.println("传给下一个处理者：" + this.successor);
            this.successor.handleRequest(request);
        } else {
            System.out.println("请求：[" + request.getName() + "]处理完毕");
        }
    }

    @Override
    public String toString() {
        return "BHandler " + this.handlerName;
    }
}
```

具体处理者`CHandler`代码：
```java
public class CHandler extends Handler {

    private String handlerName;

    public CHandler(String handlerName) {
        this.handlerName = handlerName;
    }


    @Override
    public void handleRequest(Request request) {
        System.out.println(this + " 正在处理请求：" + request.getName());
        if (null != this.successor) {
            System.out.println("传给下一个处理者：" + this.successor);
            this.successor.handleRequest(request);
        } else {
            System.out.println("请求：[" + request.getName() + "]处理完毕");
        }
    }

    @Override
    public String toString() {
        return "CHandler " + this.handlerName;
    }
}
```

客户端调用：
```java
public class Client {

    public static void main(String[] args) {
        Request request = new Request("发牌");
        Handler a = new AHandler("aa");
        Handler b = new BHandler("bb");
        Handler c = new CHandler("cc");
        a.setSuccessor(b);
        b.setSuccessor(c);

        a.handleRequest(request);
    }
}
```
运行结果；
```
AHandler aa 正在处理请求：发牌
传给下一个处理者：BHandler bb
BHandler bb 正在处理请求：发牌
传给下一个处理者：CHandler cc
CHandler cc 正在处理请求：发牌
请求：[发牌]处理完毕
```
可以看到`aa`、`bb`、`cc`处理器连城一条链，如果此时要在`bb`后面增加一个处理者，只需要此处理者继承`Handler`类，然后在客户端重新设置处理器的排序就可以了，现有代码，不需要进行更改。

### JFinal中的处理器配置
大概了解了职责链模式，再看JFinal中的处理器系统，在JFinal中，配置处理器是在`JFinalConfig`类中，涉及到两个类：`Handler`和`Handlers`；管理配置处理器链的则是`HandlerFactory`；至于初始化工作则是在`JFinal`类中。

#### Handler
```java
package com.jfinal.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Handler.
 * <p>
 * You can config Handler in JFinalConfig.configHandler() method,
 * Handler can do anything under the jfinal action.
 */
public abstract class Handler {
	
	/**
	 * The next handler
	 */
	protected Handler next;
	
	/**
	 * Use next instead of nextHandler
	 */
	@Deprecated
	protected Handler nextHandler;
	
	/**
	 * Handle target
	 * @param target url target of this web http request
	 * @param request HttpServletRequest of this http request
	 * @param response HttpServletRequest of this http request
	 * @param isHandled JFinalFilter will invoke doFilter() method if isHandled[0] == false,
	 * 			it is usually to tell Filter should handle the static resource.
	 */
	public abstract void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled);
}
```
可以看到，`Handler`的结构和职责链没啥区别，就是要处理的请求参数多了点。另外，作为下一个处理器的引用有两个`next`和`nextHandler`，其中一个是过期的，通篇看完JFinal的处理器系统，没发现这俩货有啥区别。

#### Handlers
```java
package com.jfinal.config;

import java.util.ArrayList;
import java.util.List;
import com.jfinal.core.ActionHandler;
import com.jfinal.handler.Handler;

final public class Handlers {
	
	private ActionHandler actionHandler = null;
	private final List<Handler> handlerList = new ArrayList<Handler>();
	
	public Handlers add(Handler handler) {
		if (handler == null) {
			throw new IllegalArgumentException("handler can not be null");
		}
		handlerList.add(handler);
		return this;
	}
	
	public Handlers setActionHandler(ActionHandler actionHandler) {
		this.actionHandler = actionHandler;
		return this;
	}
	
	public List<Handler> getHandlerList() {
		return handlerList;
	}
	
	public ActionHandler getActionHandler() {
		return actionHandler;
	}
}
```
`Handlers`的作用类似于路由系统中的`Routes`，用来保存配置的处理器信息，具体来说`Handlers`中有一个`List<Handler>`类型的引用`handlerList`，每次添加处理器都通过`add`方法添加到`handlerList`中。通过实现`JFinalConfig`来配置处理器：
```java
public abstract class JFinalConfig {
	/**
	 * Config handler
	 */
	public abstract void configHandler(Handlers handlers);
}
```
具体代码执行带用处则在`Config`中：
```java
class Config {
	private static final Handlers handlers = new Handlers();

	static void configJFinal(JFinalConfig jfinalConfig) {
		jfinalConfig.configHandler(handlers);
		// ...
	}

	public static Handlers getHandlers() {
		return handlers;
	}
}
```
至此，JFinal处理器系统的配置工作完成。

在`Handlers`中还有个ActionHandler类型的成员actionHandler，以及它的getter和setter方法。简单的说，`ActionHandler`是一个特殊的处理器：
```java
public class ActionHandler extends Handler {
	// ...
}
```
具体的实现，后续再说，现在我们只需要知道它是一个处理器即可。

### JFinal处理器的初始化
由于处理器的结构比较简单，配置、初始化、处理请求放一起好理解。接下来看初始化过程，初始化工作是在`JFinal`类中：
```java
public final class JFinal {

	void init(JFinalConfig jfinalConfig, ServletContext servletContext) {
		this.servletContext = servletContext;
		this.contextPath = servletContext.getContextPath();
		
		initPathKit();
		
		Config.configJFinal(jfinalConfig);	// start plugin, init log factory and init engine in this method
		constants = Config.getConstants();
		
		initActionMapping();
		initHandler();
		initRender();
		initOreillyCos();
		initTokenManager();
	}
}
```
通过`Config`读取`JFinalConfig`中配置的系统常量、路由、处理器、拦截器等信息后，`JFinal`对这些信息进行初始化工作。看看`initHandler`方法：
```java
private void initHandler() {
	ActionHandler actionHandler = Config.getHandlers().getActionHandler();
	if (actionHandler == null) {
		actionHandler = new ActionHandler();
	}
	
	actionHandler.init(actionMapping, constants);
	handler = HandlerFactory.getHandler(Config.getHandlers().getHandlerList(), actionHandler);
}
```
这里涉及到`actionHandler`的初始化工作，暂时先不考虑。这里先看看`HandlerFactory`：
```java
package com.jfinal.handler;

import java.util.List;

/**
 * HandlerFactory.
 */
public class HandlerFactory {
	
	private HandlerFactory() {
		
	}
	
	/**
	 * Build handler chain
	 */
	@SuppressWarnings("deprecation")
	public static Handler getHandler(List<Handler> handlerList, Handler actionHandler) {
		Handler result = actionHandler;
		
		for (int i=handlerList.size()-1; i>=0; i--) {
			Handler temp = handlerList.get(i);
			temp.next = result;
			temp.nextHandler = result;
			result = temp;
		}
		
		return result;
	}
}
```
这个类的主要工作就是将配置的`handlerList`，设置成链条，从最后一个处理器开始一次设置，`actionHandler`作为最后的处理器，返回第一个处理器，方便调用者执行

### 运行处理器
处理器的执行工作就简单了，处理器是处理客户端的每次请求的，所以必然是在`JFinalFilter`中的`doFilter`开始的：
```java
public void init(FilterConfig filterConfig) throws ServletException {
	// ...  JFinal初始化部分

	encoding = constants.getEncoding();
	jfinalConfig.afterJFinalStart();
	
	handler = jfinal.getHandler();		// 开始接受请求
}

public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
	HttpServletRequest request = (HttpServletRequest)req;
	HttpServletResponse response = (HttpServletResponse)res;
	request.setCharacterEncoding(encoding);
	
	String target = request.getRequestURI();
	if (contextPathLength != 0) {
		target = target.substring(contextPathLength);
	}
	
	boolean[] isHandled = {false};
	try {
		handler.handle(target, request, response, isHandled);
	}
	catch (Exception e) {
		if (log.isErrorEnabled()) {
			String qs = request.getQueryString();
			log.error(qs == null ? target : target + "?" + qs, e);
		}
	}
	
	if (isHandled[0] == false) {
		chain.doFilter(request, response);
	}
}
```
通过`handler.handle(target, request, response, isHandled)`开始处理器链条的处理流程。这里处理请求时，接收`4`个参数`target`、`request`、`response`以及`isHandled`，看`Handler`类上关于`handle`方法的参数说明：

* target：客户端http请求的`url`
* request：本次请求的`HttpServletRequest`对象
* response： 本次请求对于的响应`HttpServletResponse`对象
* isHandled：如果`isHandled[0] == false`，就会执行`chain.doFilter()`方法，通常用来通知拦截器处理静态资源

前三个参数都好理解，最后一个参数是怎么实现的呢？这时候需要看看`ActionHandler`了：
```java
public class ActionHandler extends Handler {
	public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
		if (target.indexOf('.') != -1) {
			return ;
		}
		
		isHandled[0] = true;

		// 其他代码
	}
}
```
`ActionHandler`作为最后一个处理器，对`isHandled`进行设置`isHandled[0] = true`，然后对`target`进行解析，找到对应的路由，进行拦截器上的工作、最后视图渲染返回给客户。这里对于静态资源的判断简单粗暴啊，判断`target`是否包含`.`，如果包含，即表示是一个静态资源，退出处理器链，在`JFinalFilter`中进行下一步操作，因为此时`isHandled[0]`的值是`false`，所以会执行`doFilter()`方法。所以在JFinal中，如果在项目根目录(一般是WebRoot)下的资源，如果文件没有后缀名，那就找不到了。

另外，就是`isHandled`的类型，是一个`boolean`的数组，因为在Java中方法参数是按引用传递的，如果使用基本数据类型`boolean`，就没法通过最后一个处理器中处理该值了，当然还有一个办法在`Handler`方法中将`handle`方法的返回值申明为`boolean`类型，但是没有意义就没那么明确了。
