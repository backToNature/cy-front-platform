var wrapper = require('co-mysql'),
    dbconfig = require('../conf/db'),
    mysql = require('mysql'),
    sql_mapping = require('./user_sql_mapping'),
    co = require('co');


var pool = mysql.createPool(dbconfig.mysql),
    p = wrapper(pool);


module.exports = {
    select
};

// co
co(function*() {
    var rows = yield p.query('SELECT 1');
})();

