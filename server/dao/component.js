var dbconfig = require('../conf/db'),
    mysql = require('mysql'),
    sql_mapping = require('./component_sql_mapping'),
    co = require('co');

var pool = mysql.createPool(dbconfig.mysql);


function query(sql, params) {
    return function (fn) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, params, fn);
            connection.release();
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
    },
    modifyComponent: function *(params) {
        /**
         * @params
         * component_id {int}: 组件id
         * user_id {INT}: 用户id
         * title {string}: 组件title
         * tag {string}: 组件标签
         * description {string}: 组件简介
         * utime {date}: 更新时间
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
    },
    modifyComponent2: function *(params) {
        /**
         * @params
         * component_id {int}: 组件id
         * user_id {INT}: 用户id
         * title {string}: 组件title
         * tag {string}: 组件标签
         * description {string}: 组件简介
         * utime {date}: 更新时间
         */
        var result = yield query(sql_mapping.update2, params);
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
    },
    dorpComponentById: function *(params) {
        var result = yield query(sql_mapping.drop, params);
        return result;
    },
    getComponetList: function *() {
        var result = yield query(sql_mapping.queryAll);
        var list = result[0];
        return list;
    },
    getComponentById: function *(params) {
        var result = yield query(sql_mapping.queryById, params);
        var list = result[0];
        return list;
    },
    getUserComponent: function *(params) {
        var result = yield query(sql_mapping.queryByUserId, params);
        var list = result[0];
        return list;
    },
    validateUserIsHasThisComponent: function *(params) {
        var result = yield query(sql_mapping.queryByIdUserId, params);
        if (result[0].length) {
            // 存在
            return true;
        } else if (result[0].length === 0) {
            // 不存在
            return false;
        } else {
            // 查询出错
            return 'error';
        }
    },


};