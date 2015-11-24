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
    // 获取用户信息
    getUserInfo: function (params, fn) {
    	/**
		 * @params
		 * id {INT}: 用户id
		 */
    	query(sql_mapping.getUserInfo, params, fn);
    },
    login: function (params, fn) {

    }
};