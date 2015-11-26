module.exports = {
    queryById: 'SELECT * FROM user WHERE id=?;',
    queryByAccount: 'SELECT * FROM user WHERE account=?;',
    loginQuery: 'SELECT * FROM user WHERE account=? and password=?;',
    update: 'UPDATE user SET password=?, role=? WHERE userId=?;',
    select: 'SELECT * FROM user;',
    insert:'INSERT INTO user(account, pwd, role) VALUES(?,?,?)',
};