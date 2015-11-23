var koa = require('koa');

var app = module.exports = koa();

app.use(function *() {
    this.body = '哈哈哈';
});

if (!module.parent) app.listen(3000);