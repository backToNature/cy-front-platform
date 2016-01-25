## 综述

* 版本：1.0.0
* 浏览器支持： 所有浏览器
* demo: 此组件不需要demo
* 源码: [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie)

## 安装

    <script src="http://0d077ef9e74d8.cdn.sohucs.com/cyanfront/cui/js-cookie/1.0.0/js-cookie.min.js"></script>

## 基本使用方法

新建一个cookie。

	Cookies.set('name', 'value');

新建一个生命周期为七天的cookie

	Cookies.set('name', 'value', { expires: 7 });

新建一个path为'/'的cookie

	Cookies.set('name', 'value', { expires: 7 });

读取cookie

	Cookies.get('name'); // => 'value'
	Cookies.get('nothing'); // => undefined

读取所有的cookie

	Cookies.get(); // => { name: 'value' }

删除cookie

	Cookies.remove('name');

删除一个路径有效的cookie

	Cookies.set('name', 'value', { path: '' });
	Cookies.remove('name'); // fail!
	Cookies.remove('name', { path: '' }); // removed!

## 解决命名冲突

如果有其他命名需要用到Cookies命名，可以用如下方法避免冲突。

	var Cookies2 = Cookies.noConflict();
	Cookies2.set('name', 'value');

_注意：.noConflict方法在用AMD或者CommonJs的情况下不适用。_

## JSON

当你想要用cookie存储json时，可以用到如下方法。

	Cookies.set('name', { foo: 'bar' });

读取cookie的时候如果使用`Cookies.get`api,获取到的是JSON字符串

	Cookies.get('name'); // => '{"foo":"bar"}'
	Cookies.get(); // => { name: '{"foo":"bar"}' }

使用`Cookies.getJSON`api，获取到的是已经转义过的数据

	Cookies.getJSON('name'); // => { foo: 'bar' }
	Cookies.getJSON(); // => { name: { foo: 'bar' } }

_注意:为了支持ie6-7,需要引入JSON-js,[https://github.com/douglascrockford/JSON-js](https://github.com/douglascrockford/JSON-js)_

## Cookie 属性

Cookie默认会有一些属性，可以通过组件选择性地来设置这些属性。

### expires

定义Cookie什么时候被删除。值可以是number,最终会被转义成"天"为单位。如果不设置这个属性，这个cookie会成为session cookie。

**Default:**Cookie 会在关闭浏览器时删除

**Examples:**

	Cookies.set('name', 'value', { expires: 365 });
	Cookies.get('name'); // => 'value'
	Cookies.remove('name');

### path

定义cookie在什么路径可见

**Default:** `/`

**Examples:**
	
	Cookies.set('name', 'value', { path: '' });
	Cookies.get('name'); // => 'value'
	Cookies.remove('name', { path: '' });

### domain

定义cookie在什么域名(子域)下可见。

**Default:** 默认在当前域名或者子域下的页面可见。

**Examples:**

假设设置一个domain为`site.com`的cookie:

	Cookies.set('name', 'value', { domain: 'subdomain.site.com' });
	Cookies.get('name'); // => undefined (need to read at 'subdomain.site.com')

### secure

如果cookie需要一个安全的协议(https),加入这个参数

**Default:** 默认不需要https

**Examples:**

	Cookies.set('name', 'value', { secure: true });
	Cookies.get('name'); // => 'value'
	Cookies.remove('name', { secure: true });