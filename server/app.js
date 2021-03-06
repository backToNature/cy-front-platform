const render = require('./lib/render');
const logger = require('koa-logger');
const route = require('koa-route');
const parse = require('co-body');
const koa = require('koa');
const serve = require('koa-static');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const json = require('koa-json');
const staticCache = require('koa-static-cache')
const os = require('os');
const path = require('path');

const app = koa();


app.keys = ['cy-front-platform'];
app.use(session(app));


app.use(json());

app.use(logger());

var posts = [];

// 路由层
var user = require('./routes/user');
app.use(route.get('/user/api/:type', user));

var component = require('./routes/component');
app.use(route.post('/component/api/:type', component));

app.use(route.get('/component/api/:type', component));


var componentPage = require('./routes/componentPage');
// 发表页面
app.use(route.get('/component/submit', componentPage.submit));
// 修改页面
app.use(route.get('/component/modify/:componentId', componentPage.modify));
// 详情页面
app.use(route.get('/component/detail/:componentId', componentPage.detail));
// 我的组件页面
app.use(route.get('/component/myComponent', componentPage.myComponent));
// 主页
app.use(route.get('/', componentPage.index));
app.use(route.get('/index', componentPage.index));
app.use(route.get('/index.html', componentPage.index));



app.use(staticCache(__dirname + '/static', {
	maxAge: 365 * 24 * 60 * 60,
	gzip: true,
    dynamic: true
}));

app.listen(80);
console.log('listening on port 80');

