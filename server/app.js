const render = require('./lib/render');
const logger = require('koa-logger');
const route = require('koa-route');
const parse = require('co-body');
const koa = require('koa');
const serve = require('koa-static');
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

var component = require('./routes/component');
app.use(route.post('/component/api/:type', component));



function *post () {
	this.body = yield render('post-test');
}
app.use(route.get('/component/post', post));

app.use(serve(__dirname + '/static'));
app.listen(3000);
console.log('listening on port 3000');