const render = require('./lib/render');
const logger = require('koa-logger');
const route = require('koa-route');
const parse = require('co-body');
const koa = require('koa');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const app = koa();

app.keys = ['cy-front-platform'];
app.use(session(app));

app.use(logger());

var posts = [];


// 路由层
var user = require('./routes/user');
app.use(route.get('/user/api/:type', user));


app.listen(3000);
console.log('listening on port 3000');