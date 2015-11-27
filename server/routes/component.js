const render = require('../lib/render');
var componetDao = require('../dao/component');
var fs = require('co-fs');

function *componet(type) {
    var req = this.request;
    var res = this.response;
    var _this = this;
    var query = req.query;
    // console.log(this.session.nickname);
    console.log(type, 1243343);
    
    if (type === 'submit') {
        // 提交
        var result = yield fs.writeFile('./files/a.md', 124234);
        this.body = result;
    }

}

module.exports = componet;