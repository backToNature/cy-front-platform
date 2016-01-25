## 综述

* 版本：1.0.0
* 浏览器支持： 所有浏览器
* demo: [http://backtonaturedemo.github.io/frontend/demo/ua/ua.html](http://backtonaturedemo.github.io/frontend/demo/ua/ua.html)
* 源码: [https://github.com/backToNature/UA](https://github.com/backToNature/UA)
* 开源优秀组件: [https://github.com/faisalman/ua-parser-js](https://github.com/faisalman/ua-parser-js)

## 安装

    <script src="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/ua/1.0.0/ua.min.js"></script>
	// 或者
	var UA = require('ua.js');

## 基本使用方法

### 判断是否为移动设备浏览器

	UA.mobile;

### 判断是否为ipad

	UA.ipad; // 返回ipad ios的版本号

### 获得使用的操作系统

	UA.os; // windows,linux,macintosh

### 获得当前设备android的版本号

	UA.android;

### 获得当前设备ios的版本号

	UA.ios；

### 获得当前浏览器名称

	UA.browser; // 浏览器名称
	// UC,weixin,qq,QQ(QQ客户端),baidu(手机百度),360,sogou...

### 获得当前浏览器版本

	UA.browserVersion; 

### 获得浏览器内核

	UA.core; // 若浏览器内核不是 trident, webkit, gecko, presto 将返回空字符串

### webkit内核版本号

	UA.webkit;

### trident内核版本号

	UA.trident;

### gecko内核版本号

	UA.gecko;

### presto内核版本号

	UA.presto;