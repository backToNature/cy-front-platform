module.exports = {
    queryByIdAndPwd: 'SELECT * FROM user WHERE id=? and pwd=?;',
    queryByAccount: 'SELECT * FROM user WHERE account=?;',
    loginQuery: 'SELECT * FROM user WHERE account=? and pwd=?;',

    update: 'UPDATE user SET pwd=? WHERE id=? and pwd=?;',
    select: 'SELECT * FROM user;',
    insert: 'INSERT INTO user(account, pwd, role) VALUES(?,?,?);'
};