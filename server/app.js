const render = require('./lib/render');
const logger = require('koa-logger');
const route = require('koa-route');
const parse = require('co-body');
const koa = require('koa');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const json = require('koa-json');
const app = koa();

app.keys = ['cy-front-platform'];
app.use(session(app));


app.use(json());

app.use(logger());

var posts = [];


// 路由层
var user = require('./routes/user');
app.use(route.get('/user/api/:type', user));

var component = require('./route/component');
app.use(route.get('/component/api/:type'), component);


app.listen(3000);
console.log('listening on port 3000');