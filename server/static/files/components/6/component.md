## 综述

* 版本：1.0.0
* 浏览器支持： PC所有浏览器
* 依赖: jQuery
* 支持AMD,CMD
* demo: [http://backtonaturedemo.github.io/frontend/demo/dialog/demo1.html](http://backtonaturedemo.github.io/frontend/demo/dialog/demo1.html)
* 源码: [https://github.com/backToNature/dialog](https://github.com/backToNature/dialog)

## 安装
	<link rel="stylesheet" type="text/css" href="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/cy-dialog/1.0.0/cy-dialog.css">
    <script src="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/cy-dialog/1.0.0/cy-dialog.min.js"></script>
	// 或者
	var Dialog = require('dialog.js');

## 使用方法

使用方法如下：
	
### alert

类似于window.alert的用法。

	Dialog.alert('123123');

![](http://comment.bjcnc.img.sohucs.com/a_auto/pxcxiuC.png)

### confirm

和window.confirm的逻辑一样，用法稍微有变化

	Dialog.confirm({
        msg: '你确定要删除?',
        confirm: function () {
            // 点击确定按钮的回调函数
            Dialog.alert('删除成功');
        }, 
        cancel: function () {
            // 点击取消按钮的回调函数
            Dialog.alert('取消删除');
        }
    });

![](http://comment.bjcnc.img.sohucs.com/a_auto/pxcxw6U.png)

### dialog

	Dialog.dialog({
        content: '<h2>我帅不帅！</h2><img width="300" src="http://s2.img.766.com/155/110518/0905/452550.jpg">',
        onComplete: function () {
            // 模态框加载完成的回调函数
        }
    });
	
![](http://comment.bjcnc.img.sohucs.com/a_auto/pxcxFVu_png)