## 综述

* 版本：1.0.0
* 浏览器支持： 手机端所有浏览器
* 支持AMD,CMD
* demo: [http://backtonaturedemo.github.io/frontend/demo/mobile-cover/demo.html](http://backtonaturedemo.github.io/frontend/demo/mobile-cover/demo.html)
* 源码: [https://github.com/backToNature/mobile-cover](https://github.com/backToNature/mobile-cover)

## 安装

    <script src="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/mobile-cover/1.0.0/mobile-cover.min.js"></script>
	// 或者
	var Cover = require('cover.js');

## 使用方法

使用方法如下：

	var cover = new Cover({
        background: 'red', // 背景颜色
        opacity: '1.0', // 透明度
        onShow: function ($mod) {
			// 展现后回调函数
            $mod.find('#hide').on('click', function () {
                cover.hide();
            });
        },
        onHide: function ($mod) {
			// 隐藏后回调函数
        }
    });
	
	// 可以渲染dom字符串
	cover.setContent('<h1>dom字符串</h1>');
	// 或者直接插入dom元素
	cover.setContent($('<h1>dom元素</h1>'));
	// 显示层
	cover.show();
	// 隐藏层
	cover.hide();
	// 销毁层
	cover.destroy();

## 参数

当新建一个Cover实例时，可以初始化一些参数

* ***background {string}***: 背景颜色
* ***opacity {string||float}***: 透明度
* ***onShow {function}***: 展现后的回调函数
	* $mod 回调入参 {dom}: 整个遮罩层的dom
* ***onHide {function}***: 隐藏后的回调函数
	* $mod 回调入参 {dom}: 整个遮罩层的dom

## API

初始化了这个遮罩后，可以调用一些方法；

### show

展示遮罩

	var cover = new Cover({
		background: 'red', // 背景颜色
        opacity: '1.0' // 透明度
	});
	cover.show();

### hide

隐藏遮罩

	var cover = new Cover({
		background: 'red', // 背景颜色
        opacity: '1.0' // 透明度
	});
	cover.hide();

### destroy

展示遮罩

	var cover = new Cover({
		background: 'red', // 背景颜色
        opacity: '1.0' // 透明度
	});
	cover.destroy();