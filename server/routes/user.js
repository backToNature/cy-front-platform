const render = require('../lib/render');
var userDao = require('../dao/user');

function *user(type) {
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
	if (type === 'login') {
		// 登陆
        var account = query.account, pwd = query.pwd;
        if (!account || !pwd) {
            return;
        }

        if (typeof account !== 'string' && typeof pwd !== 'string') {
            return;
        }

        var result = yield userDao.login([account, pwd]);
        if (result.code === 200) {
            if (result.status === 'success') {
                this.session.userId = result.data.id;
                this.session.nickname = result.data.nickname;
                this.session.img_url = result.data.img_url;
                this.session.role = result.data.role;
                this.body = {
                    code: 200,
                    status: 'success',
                    msg: 'login success'
                };
            } else {
               this.body = result; 
            }
        }
	} 

	if (type === 'logout') {
		// 登出
		this.session.userId = null;
        this.session.nickname = null
        this.session.img_url = null
        this.session.role = null
        this.body = {
            code: 200,
            status: 'success',
            msg: 'logout success'
        };
	}

    if (type === 'get_user_info') {
        if (this.session.userId) {
            this.body = {
                code: 200,
                data: {
                    nickname: this.session.nickname,
                    img_url: this.session.img_url,
                    role: this.session.role
                },
                status: 'success',
                msg: 'get success'
            };
        } else {
            this.body = {
                code: 200,
                data: {},
                status: 'failed',
                msg: 'get failed'
            }
        }
    }

    if (type === 'modify') {
        // 判断是否登陆
        if (!this.session.userId) {
            this.body = {
                code: 200,
                status: 'failed',
                msg: 'please login first'
            };
            return;
        }

        var result = yield userDao.modify([query.new_pwd, this.session.userId, query.old_pwd]);
        if (result.code === 200) {
            if (result.status === 'success') {
                this.body = result;
            } else {
                this.body = result;
            }
        } 
    }
}

module.exports = user;