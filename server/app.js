var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

var posts = [];

app.use(logger());

// 路由层
app.use(route.get('/', index));

function *index() {
  this.body = yield render('login-test');
}


app.listen(3000);
console.log('listening on port 3000');