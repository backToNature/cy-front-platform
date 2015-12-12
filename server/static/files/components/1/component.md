title: script标签小记
date: 2014-12-24 17:20:55
category: web前端
---

## 概述

使用script标签的方式有两种，内嵌和外
引。并且两种方式不能混用，混用的情况下只会加载src里的外部脚本。并且在不设置任何属性下，所有的脚本都会同步顺序地加载执行。

## script元素的属性

* asyns: 可选。
* defer: 可选。
* src: 可选。
* type: 可选。
* 其余省略

## defer（延迟脚本）

表示脚本可以延迟到文档完全被解析和显示之后再执行。***只对外部脚本有效***，并且ie7及其以上也支持这个属性。

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="example1.js" defer="defer"></script>
    <script src="example2.js" defer="defer"></script>
</head>
<body>
</body>
</html>
```

这个例子中，虽然把脚本放在了head中，但是这两个脚本将会在整个页面加载完成后才会执行，而且不一定会顺序执行。


***在 IE6 IE7 IE8 中，当使用 innerHTML 方法插入脚本时，SCRIPT 元素必须设置 defer 属性。不然没法执行脚本***

支持的浏览器有IE,firefox,Safari,Chrome，具体支持方式还有待测试。

## asyns（异步脚本）

同样与defer类似，asyns也只适用于外部脚本，并告诉浏览器立即下载文件。与defer不同的是，本asyns标记的脚本不会按顺序执行(defer还可能按顺序执行)。

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="example1.js" async="async"></script>
    <script src="example2.js" async="async"></script>
</head>
<body>
</body>
</html>
```
异步脚本基本和页面同时开始加载，并且是并发加载的，所以上面两个脚本不会等到页面加载之后才会加载。

支持的浏览器有: firefox,Safari,Chrome。

## 动态加载脚本

很多时候，我们会需要动态加载一些脚本。下面是我总结的一些方法。

#### 方法一

```
function loadScript(url) {
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}
```
#### 方法二(字符串传递)

有时候我们需要把从第三方拿到的脚本字符串在页面执行，可以使用如下方式创建。

```
function loadScriptString(str) {
    var script = document.createElement("script");
    try{
        // Safari3不支持text属性
        script.appendChild(document.createTextNode(str));
    } catch(e){
        // 为了兼容IE，IE不允许访问script对象的子节点。
        script.text = str;
    } 
    document.body.appendChild(script);
}
```

    var $$event = require('widget/util/events.js')
    $$event.trigger('CUSTOM_EVT_COMMENTS_LIST_RENDER', function (data) {
     // your code
    });