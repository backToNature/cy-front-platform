## 综述

* 版本：1.0.0
* 浏览器支持： PC所有浏览器(ie6裁剪框无透明遮罩效果)
* 应用前，需要引用jquery

## 安装

    <script src="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/cut-image/1.0.0/cut.min.js"></script>

## 初始化

    var cut = new cutImg($('#aaa'), {
        cutWidth : 200,  //裁剪后图片宽度
        cutHeight : 200,  //裁剪后图片高度
        containerWidth : 300,  //裁剪容器宽度
        containerHeight : 300,  //裁剪容器高度
        url : 'http://0d077ef9e74d8.cdn.sohucs.com/topic_picture_1'  //需裁剪图片url
    });

## API

* .bigger()

放大需裁剪的图片

* .smaller()

缩小需裁剪的图片

* .cut(function (url) {})

裁剪图片，回调函数返回裁剪成功后图片的url
	