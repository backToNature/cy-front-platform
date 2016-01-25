## 综述

* 版本：1.0.0
* 浏览器支持： 所有浏览器
* demo: [http://backtonaturedemo.github.io/frontend/demo/mobile-dialog/demo.html](http://backtonaturedemo.github.io/frontend/demo/mobile-dialog/demo.html)
* 源码: [https://github.com/backToNature/mobile-dialog](https://github.com/backToNature/mobile-dialog)

## 安装
	
	<link rel="stylesheet" href="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/mobile-dialog/1.0.0/mobile-dialog.min.css" />
    <script src="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/mobile-dialog/1.0.0/mobile-dialog.min.js"></script>	

## 使用方法


	Dialog.init({
        tpl: '<p>弹出的内容</p>',
        onshowed: function ($el) {
            console.log($el);
        }
    });

## API

`Dialog.init(cfg)`: 初始化模态框
	
* tpl: 需要弹出的模板
* onshowed: 初始化后的回调

`Dialog.close()`: 关闭模态框