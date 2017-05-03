id: 41
title: 使用nodejs进行Base64编码、解码
date: 2017-04-15
category: nodejs
tags: javascript, nodejs
description: 简单的工具方法，分别对字符串和文件进行Base64编码、解码

------
简单的工具方法，分别对字符串和文件进行Base64编码、解码

### 字符串编码
```javascript
/**
 * 将str进行Base64编码
 * 返回编码后的字符串
 */
let encodeStr = function(str) {
	let b = Buffer.from(str);
	return b.toString('base64');
};
```

### 字符串解码
```javascript
/**
 * 将Base64编码后的字符串解码
 * 返回原字符串
 */
let decodeStr = function(str) {
	let b = Buffer.from(str, 'base64');
	return b.toString();
};
```

### 文件Base64编码
这里需要引入`fs`模块：`const fs = require('fs');`

*异步方式：*
```javascript
/**
 * 将文件进行Base64编码
 * file 要进行处理的文件路径
 * callback 回调函数 参数：err data
 */
let encodeFile = function(file, callback) {
	fs.readFile(file, (err, data) => {
		if (err) {
			console.log(`文件：${file} 读取错误`);
			console.log(`错误信息：${err.message}`);
			console.log(`错误地址：${err.stack}`);
			callback(err);
		} else {
			let b = Buffer.from(data);
			callback(null, b.toString('base64'));
		}
	});
};
```

*同步方式：*
```javascript
/**
 * encodeFile的同步版本
 */
let encodeFileSync = function(file) {
	try {
		let data = fs.readFileSync(file);
		let b = Buffer.from(data);
		return b.toString('base64');
	} catch (err) {
		console.log(`文件：${file} 读取错误`);
		console.log(`错误信息：${err.message}`);
		console.log(`错误地址：${err.stack}`);
	}
};
```

### 文件Base64解码
同样需要引入`fs`模块

*异步方式：*
```javascript
/**
 * 将Base64处理文件后的结果写入到指定文件中
 * file 目标文件路径
 * data 编码后的字符串
 * callback 回调函数 err
 */
let decodeFile = function(file, data, callback) {
	let b = Buffer.from(data, 'base64');
	fs.writeFile(file, b, (err) => {
		if (err) {
			console.log(`文件：${file} 写入错误`);
			console.log(`错误信息：${err.message}`);
			console.log(`错误地址：${err.stack}`);
			callback(err);
		} else {
			console.log(`文件：${file} 写入成功`);
			callback();
		}
	});
};
```

*同步方式：*
```javascript
/**
 * decodeFile的同步版本
 */
let decodeFileSync = function(file, data) {
	let b = Buffer.from(data, 'base64');
	try {
		fs.writeFileSync(file, b);
		console.log(`文件：${file} 写入成功`);
	} catch (err) {
		console.log(`文件：${file} 写入错误`);
		console.log(`错误信息：${err.message}`);
		console.log(`错误地址：${err.stack}`);
	}
};
```
