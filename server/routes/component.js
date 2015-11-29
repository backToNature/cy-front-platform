const render = require('../lib/render');
const componetDao = require('../dao/component');
const parse = require('co-busboy');
const postParse = require('co-body');
const fs = require('fs');
const path = require('path');
const componentDao = require('../dao/component');

function *componet(type) {
    var req = this.request;
    var res = this.response;
    var query = req.query;
    if (type === 'submitImg') {
        if (!this.session.userId) {
            this.body = {
                code: 200,
                status: 'failed',
                msg: 'please login first'
            };
            return;
        }
        
        console.log(query);

        // 计算组件路径
        var thumbnailPath = path.resolve(__dirname, '../static/files/components/' + this.session.userId);
        if (!fs.existsSync(thumbnailPath)) {
            fs.mkdirSync(thumbnailPath);
        }
        // 删除多余的临时缩略图
        var fileList = fs.readdirSync(thumbnailPath);
        fileList.forEach(function (item) {
            if (path.extname(item)) {
                fs.unlinkSync(thumbnailPath + '/' + item);
            }
        });

        // 上传缩略图
        var parts = parse(this);
        var part, filename;
        while (part = yield parts) {
            var stream = fs.createWriteStream(thumbnailPath + '/' + part.filename);
            part.pipe(stream);
            filename = part.filename;
            console.log('uploading %s -> %s', part.filename, stream.path);
        }

        this.body = {
            code: 200,
            status: 'success',
            img: '/files/components/'+ this.session.userId +'/' + filename,
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
        var userComponentPath = path.resolve(__dirname, '../static/files/components/' + this.session.userId);
        var componentId;
        if (result.code === 200) {
            if (result.status === 'success') {
                componentId = result.data.id; 
            } else {
                this.body = {
                    code: 200,
                    status: 'failed',
                    msg: 'submit failed'
                };
                return;
            }
        }

        if (!fs.existsSync(userComponentPath)) {
            fs.mkdirSync(userComponentPath);
        }
        var componentPath = userComponentPath + '/' + componentId;
        if (!fs.existsSync(componentPath)) {
            fs.mkdirSync(componentPath);
        }

        fs.writeFileSync(componentPath + '/' + postQuery.title + '.md', postQuery.content);

        var thumbnailName = path.basename(postQuery.img);
        if (thumbnailName) {
            if (fs.existsSync(userComponentPath + '/' + thumbnailName)) {
                fs.renameSync(userComponentPath + '/' + thumbnailName, componentPath + '/' + thumbnailName);
            }
        }
        this.body = {
            code: 200,
            status: 'success',
            msg: 'submit success'
        };
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
        if (!this.session.userId) {
            this.body = {
                code: 200,
                status: 'failed',
                msg: 'please login first'
            };
            return;
        }
        var postQuery = yield postParse(this);
        var componentId = postQuery.component_id;
        var result = yield componentDao.modifyComponent([postQuery.title, postQuery.tag, postQuery.description, new Date(), componentId, this.session.userId]);
        
        var userComponentPath = path.resolve(__dirname, '../static/files/components/' + this.session.userId);
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

        if (!fs.existsSync(userComponentPath)) {
            fs.mkdirSync(userComponentPath);
        }
        var componentPath = userComponentPath + '/' + componentId;
        if (!fs.existsSync(componentPath)) {
            fs.mkdirSync(componentPath);
        }

        fs.writeFileSync(componentPath + '/' + postQuery.title + '.md', postQuery.content);

        var thumbnailName = path.basename(postQuery.img);
        if (thumbnailName) {
            if (fs.existsSync(userComponentPath + '/' + thumbnailName)) {
                fs.renameSync(userComponentPath + '/' + thumbnailName, componentPath + '/' + thumbnailName);
            }
        }
        this.body = {
            code: 200,
            status: 'success',
            msg: 'modify success'
        };

    }
}

module.exports = componet;