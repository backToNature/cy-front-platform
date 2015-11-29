var dbconfig = require('../conf/db'),
    mysql = require('mysql'),
    sql_mapping = require('./user_sql_mapping'),
    co = require('co');

var pool = mysql.createPool(dbconfig.mysql);


function query(sql, params) {
    return function (fn) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, params, fn);
        });
    };
}
// var query = function (sql, params, fn) {
// 	pool.getConnection(function (err, connection) {
// 	    connection.query(sql, params, function (err, result) {
//             // fn(result);
// 	        connection.release();
// 	    });
// 	});
// };

module.exports = {
	// 获取用户列表
    getUserList: function *(params) {

		return yield query(sql_mapping.select, params);
    },
    // 获取用户名是否存在
    accountIsExsit: function *(params) {
        /**
         * @params
         * account {string}: 用户账号
         */
        var result = yield query(sql_mapping.queryByAccount, params);
        if (result[0].length) {
            return true;
        } else if (result[0].length === 0) {
            return false;
        } else {
            return 'error';
        }
    },
    // 获取用户信息
    getUserInfo: function (params, fn) {
    	/**
		 * @params
		 * id {INT}: 用户id
		 */
    	query(sql_mapping.getUserInfo, params, fn);
    },
    // 注册
    signUp: function *(params) {
        /**
         * @params
         * account {string}: 用户名
         * pwd {string}: 密码
         */
        var accountIsExsit = yield this.accountIsExsit(params[0]);
        if (accountIsExsit === true) {
            return {
                code: 200,
                status: 'failed',
                msg: 'account is exsit'
            }
        } else if (accountIsExsit === false) {
            var result = yield query(sql_mapping.insert, params);
            if (result[0].insertId) {
                return {
                    code:200,
                    status: 'success',
                    msg: 'register success'
                };
            }
        }
    },
    // 登陆
    login: function *(params) {
        /**
         * @params
         * account {string}: 用户名
         * pwd {string}: 密码
         */
         var result = yield query(sql_mapping.loginQuery, params);
         if (result[0].length) {
            return {
                code: 200,
                data: {
                    id: result[0][0].id,
                    nickname: result[0][0].nickname,
                    img_url: result[0][0].img_url,
                    role: result[0][0].role
                },
                status: 'success',
                msg: 'login success'
            };
         } else {
            return {
                code: 200,
                status: 'failed',
                msg: 'login failed'
            };
         }
    },
    modify: function *(params) {
        /**
         * @params
         * pwd {string}: 新密码
         * id {int}: 用户id
         * pwd {string}: 旧密码
         */

        var result = yield query(sql_mapping.update, params);
        if (result[0].changedRows) {
            return {
                code: 200,
                status: 'success',
                msg: 'modify success'
            };
        } else {
            return {
                code: 200,
                status: 'failed',
                msg: 'modify failed'
            };
        }
    }
};