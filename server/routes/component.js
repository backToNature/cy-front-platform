const render = require('../lib/render');
const componetDao = require('../dao/component');
const parse = require('co-busboy');
const postParse = require('co-body');
const fs = require('fs');
const path = require('path');
const componentDao = require('../dao/component');
const util = require('util');
const os = require('os');
var componentModel = require('../model/component');

function *componet(type) {
    var req = this.request;
    var res = this.response;
    var query = req.query;

    if (this.method == 'GET') {
        if (type === 'list') {
            var result = yield componentDao.getComponetList();
            if (util.isArray(result)) {
                result.forEach(function (item) {
                    item.ctime = item.ctime.valueOf();
                    item.utime = item.utime.valueOf();
                });
                this.body = {
                    code: 200,
                    status: 'success',
                    data: result,
                    msg: 'query success'
                };
            } else {
                this.body = {
                    code: 200,
                    status: 'failed',
                    msg: 'query failed'
                };
            }
            return;
        }
        if (type === 'userList') {
            if (!this.session.userId) {
                this.body = {
                    code: 200,
                    status: 'failed',
                    msg: 'please login first'
                };
                return;
            }
            var result = yield componentDao.getUserComponentList([this.session.userId]);
            if (util.isArray(result)) {
                result.forEach(function (item) {
                    item.ctime = item.ctime.valueOf();
                    item.utime = item.utime.valueOf();
                });
                this.body = {
                    code: 200,
                    status: 'success',
                    data: result,
                    msg: 'query success'
                };
            } else {
                this.body = {
                    code: 200,
                    status: 'failed',
                    msg: 'query failed'
                };
            }
            return;
        }
    }

    if (type === 'submitImg') {
        if (!this.session.userId) {
            this.body = {
                code: 200,
                status: 'failed',
                msg: 'please login first'
            };
            return;
        }

        function uid() {
          return Math.random().toString(36).slice(2);
        }

        var tmpdir = path.resolve(__dirname, '../static/files/tmp');
        console.log(tmpdir);
        if (!fs.existsSync(tmpdir)) {
            fs.mkdirSync(tmpdir);
        }

        // 上传缩略图
        var parts = parse(this);
        var filename, name;
        while (part = yield parts) {
            name = uid() + path.extname(part.filename);
            console.log(part);
            filename = path.join(tmpdir, name);
            var stream = fs.createWriteStream(filename);
            part.pipe(stream);
            console.log('uploading %s -> %s', filename, stream.path);
        }

        this.body = {
            code: 200,
            status: 'success',
            img: '/files/tmp/' + name,
            msg: 'uploading success'
        };
    }

    if (type === 'submit') {
        // 判断是否登陆
        if (!this.session.userId) {
            this.body = {
                code: 200,
                status: 'failed',
                msg: 'please login first'
            };
            return;
        }

        var postQuery = yield postParse(this);
        var result = yield componentDao.addComponent([this.session.userId, postQuery.title, postQuery.tag, postQuery.description, new Date()]);
        var componentsRoot = path.resolve(__dirname, '../static/files/components');
        var tmpdir = path.resolve(__dirname, '../static/files/tmp');
        var componentId;
        if (result.code === 200) {
            if (result.status === 'success') {
                componentId = result.data.id.toString();
            } else {
                this.body = {
                    code: 200,
                    status: 'failed',
                    msg: 'submit failed'
                };
                return;
            }
        }
        var componentPath = path.join(componentsRoot, componentId);

        if (!fs.existsSync(componentPath)) {
            fs.mkdirSync(componentPath);
        }

        fs.writeFileSync(path.join(componentPath, 'component.md'), postQuery.content);

        var thumbnailName = path.basename(postQuery.img);

        var componentUrl = path.join('/files/components/', componentId, 'component.md');
        var thumbnailUrl = '/files/components/thumbnail.png';

        if (thumbnailName) {
            if (fs.existsSync(path.join(tmpdir, thumbnailName))) {
                fs.renameSync(path.join(tmpdir, thumbnailName), path.join(componentPath, 'thumb' + path.extname(thumbnailName)));
                thumbnailUrl = path.join('/files/components/', componentId, 'thumb' + path.extname(thumbnailName));
            }
        }
        var Mresult = yield componentDao.modifyComponent([postQuery.title, postQuery.tag, postQuery.description, new Date(), componentUrl, thumbnailUrl, componentId, this.session.userId]);
        if (Mresult.code === 200) {
            if (Mresult.status === 'success') {
                this.body = {
                    code: 200,
                    status: 'success',
                    msg: 'submit success'
                };
            } else {
                this.body = {
                    code: 200,
                    status: 'failed',
                    msg: 'submit failed'
                };
            }
        }
    }

    if (type === 'modify') {
        // 判断是否登陆
        if (!this.session.userId) {
            this.body = {
                code: 200,
                status: 'failed',
                msg: 'please login first'
            };
            return;
        }
        var tmpdir = path.resolve(__dirname, '../static/files/tmp');

        var postQuery = yield postParse(this);
        var componentId = postQuery.component_id.toString();
        
        var componentRoot = path.resolve(__dirname, '../static/files/components');
        var componentPath = path.join(componentRoot, componentId);

        fs.writeFileSync(path.join(componentPath, 'component.md'), postQuery.content);

        var thumbnailName = path.basename(postQuery.img);
        var thumbnailUrl = '';
        var componentUrl = path.join('/files/components/', componentId, 'component.md');

        if (thumbnailName) {
            if (fs.existsSync(path.join(tmpdir, thumbnailName))) {
                fs.renameSync(path.join(tmpdir, thumbnailName), path.join(componentPath,'thumb' + path.extname(thumbnailName)));
                thumbnailUrl = path.join('/files/components/', componentId, 'thumb' + path.extname(thumbnailName));
            }
        }
        var result;
        if (thumbnailUrl.length == 0) {
            result = yield componentDao.modifyComponent2([postQuery.title, postQuery.tag, postQuery.description, new Date(), componentUrl, componentId, this.session.userId]);
        } else {
            result = yield componentDao.modifyComponent([postQuery.title, postQuery.tag, postQuery.description, new Date(), componentUrl, thumbnailUrl, componentId, this.session.userId]);
        }

        if (result.code === 200) {
            if (result.status !== 'success') {
                this.body = {
                    code: 200,
                    status: 'failed',
                    msg: 'modify failed'
                };
                return;
            }
        }

        this.body = {
            code: 200,
            status: 'success',
            msg: 'modify success'
        };
    }

    if (type === 'delete') {
        // 判断是否登陆
        if (!this.session.userId) {
            this.body = {
                code: 200,
                status: 'failed',
                msg: 'please login first'
            };
            return;
        }
        
    }
}

module.exports = componet;