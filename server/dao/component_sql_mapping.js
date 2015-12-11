module.exports = {
    queryById: 'SELECT * FROM component WHERE id=?;',
    queryByIdUserId: 'SELECT * FROM component WHERE id=? and user_id=?;',
    queryByUserId: 'SELECT * FROM component WHERE user_id=?;',
    queryAll: 'SELECT * FROM component;',
    insert: 'INSERT INTO component(user_id, title, tag, description, utime) VALUES(?,?,?,?,?);',
    update: 'UPDATE component SET title=?, tag=?, description=?, utime=?, md_url=?, thub_url=? WHERE id=? and user_id=?;',
    update2: 'UPDATE component SET title=?, tag=?, description=?, utime=?, md_url=? WHERE id=? and user_id=?;'
};