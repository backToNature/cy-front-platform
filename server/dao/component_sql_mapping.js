module.exports = {
    queryById: 'SELECT * FROM component WHERE id=?;',
    queryAll: 'SELECT * FROM component;',
    insert: 'INSERT INTO component(user_id, title, tag, description, utime) VALUES(?,?,?,?,?);'
};