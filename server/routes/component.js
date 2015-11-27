const render = require('../lib/render');
var componetDao = require('../dao/componet');

function *componet(type) {
    var req = this.request;
    var res = this.response;
    var _this = this;
    var query = req.query;
    console.log(this.session.nickname);
    if (type === 'sign_up') {
        // 注册
        var account = query.account, pwd = query.pwd;
        if (!account || !pwd) {
            return;
        }
        if (typeof account !== 'string' && typeof pwd !== 'string') {
            return;
        }
        this.body = yield userDao.signUp([account, pwd , 0]);
    }

}

module.exports = componet;