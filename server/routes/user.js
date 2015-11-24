const render = require('../lib/render');

function *user(type) {

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
	}


}

module.exports = user;