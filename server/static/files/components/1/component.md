# 畅言UA组件使用说明

由于移动端多种系统与浏览器兼容问题较多，所以我们需要一个UA组件判断用户的系统、浏览器、版本等信息。

## 引入ua.js

    var $$UA = require('widget/util/ua.js');

## 使用UA

	var $$UA = require('widget/util/ua.js');
	var os = $$UA.os; // 系统名称

## demo页面

[http://backtonaturedemo.github.io/frontend/case/ua/uatest.html](http://backtonaturedemo.github.io/frontend/case/ua/uatest.html)

## 参数说明

### UA.trident

{Number} - trident 的版本号

### UA.webkit

{Number} - webkit 的版本号

### UA.gecko

{Number} - gecko 的版本号

### UA.presto

{Number} - presto 的版本号

### UA.chrome

{Number} - chrome 的版本号

### UA.safari

{Number} - safari 的版本号

### UA.firefox

{Number} - firefox 的版本号

### UA.ie

{Number} - ie 的版本号

### UA.opera

{Number} - opera 的版本号

### UA.mobile

{String} - mobile的标志符。 若无法探测或非移动设备浏览器，将返回空字符串。

### UA.core

{String} - core 的标志符。此标识符表示浏览器的内核标识。若浏览器内核不是 trident, webkit, gecko, presto 将返回空字符串。

### UA.ipad

{Number} - ipad 的版本号

### UA.ios

{Number} - ios 的版本号

### UA.android

{Number} - android 的版本号

### UA.browser

{String} - 浏览器名称

### UA.browserVersion

{String} - 浏览器版本号
