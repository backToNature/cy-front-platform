var dbconfig = require('../conf/db'),
    mysql = require('mysql'),
    sql_mapping = require('./user_sql_mapping');

var pool = mysql.createPool(dbconfig.mysql);

var query = function (sql, params, fn) {
	pool.getConnection(function (err, connection) {
	    var responseText;
	    connection.query(sql, params, function (err, result) {
            fn(result);
	        connection.release();
	    });
	});
};

module.exports = {
	// 获取用户列表
    getUserList: function (params, fn) {
		query(sql_mapping.select, params, fn);
    },
    // 获取用户名是否存在
    accountIsExsit: function (params, fn) {
        /**
         * @params
         * account {string}: 用户账号
         */
        query(sql_mapping.queryByAccount, params, fn);
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
    signUp: function (params, fn) {
        /**
         * @params
         * username {string}: 用户名
         * pwd {string}: 密码
         */
        query(sql_mapping.update, params, fn);
    },
    login: function (params, fn) {

    }
};