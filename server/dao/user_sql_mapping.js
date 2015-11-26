module.exports = {
    queryById: 'SELECT * FROM user WHERE id=?;',
    queryByAccount: 'SELECT * FROM user WHERE account=?;',
    loginQuery: 'SELECT * FROM user WHERE account=? and pwd=?;',
    update: 'UPDATE user SET pwd=?, role=? WHERE id=?;',
    select: 'SELECT * FROM user;',
    insert:'INSERT INTO user(account, pwd, role) VALUES(?,?,?)',
};