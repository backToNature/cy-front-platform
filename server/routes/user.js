const render = require('../lib/render');
var userDao = require('../dao/user');

function *user(type) {
    var req = this.request;
    var res = this.response;
    var _this = this;
    var query = req.query;
    if (type === 'sign_up') {
        var account = query.account, pwd = query.pwd;
        if (!account || !pwd) {
            return;
        }

        if (typeof account !== 'string' && typeof pwd !== 'string') {
            return;
        }
        var result = yield userDao.accountIsExsit([account]);
        if (result === true) {
            this.body = {
                code: 200,
                msg: 'this account has already exsit'
            };
        } else if (result === false) {
            this.body = {
                code: 200,
                msg: 'you can register this account'
            };
        }

    }
	if (type === 'login') {
		// 登陆
		if(this.session.userId) {
			console.log('account info was: ' + this.session.userId + ".");
		}
		this.session.userId = 11;
		this.body = yield render('login-test');
	} 

	if (type === 'logout') {
		// 登出
		this.session.userId = null;
        this.body = yield render('login-test');
	}

}

module.exports = user;