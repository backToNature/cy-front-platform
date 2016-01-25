## 综述

* 版本：1.0.0
* 浏览器支持： 所有浏览器
* demo: [http://backtonaturedemo.github.io/frontend/demo/tips/tips.html](http://backtonaturedemo.github.io/frontend/demo/tips/tips.html)
* 源码: [https://github.com/backToNature/metro-tips](https://github.com/backToNature/metro-tips)

## 安装

    <script src="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/metro-tips/1.0.0/metro-tips.min.js"></script>
	// 或者
	var tips = require('metro-tips.js');

## 使用方法

使用方法如下：

	Tips({
        theme: 'green',
        content: '成功',
        showTime: 1200,
        callback: function () {
            console.log(123);
        }
    });

## API说明

### 配置参数

`theme`: 主题，有green,blue,red三个主题

`content`: 提示内容

`showTime`: 展示时间

`callback`: 展示时间结束时执行的回调函数