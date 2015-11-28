var dbconfig = require('../conf/db'),
    mysql = require('mysql'),
    sql_mapping = require('./component_sql_mapping'),
    co = require('co');

var pool = mysql.createPool(dbconfig.mysql);


function query(sql, params) {
    return function (fn) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, params, fn);
        });
    };
}

module.exports = {
	addComponent: function *(params) {
        /**
         * @params
         * user_id {INT}: 用户id
         * title {string}: 组件title
         * tag {string}: 组件标签
         * description {string}: 组件简介
         * utime {date}: 更新时间
         */
        var result = yield query(sql_mapping.insert, params);
        console.log(result[0]);
        if (result[0].insertId) {
            return {
                code: 200,
                data: {
                    id: result[0].insertId
                },
                status: 'success',
                msg: 'insert success'
            };
         } else {
            return {
                code: 200,
                status: 'failed',
                msg: 'insert failed'
            };
         }

    }
    
};