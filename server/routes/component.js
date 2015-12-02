const render = require('../lib/render');
const componetDao = require('../dao/component');
const parse = require('co-busboy');
const postParse = require('co-body');
const fs = require('fs');
const path = require('path');
const componentDao = require('../dao/component');
var componentModel = require('../model/component');

function *componet(type) {
    var req = this.request;
    var res = this.response;
    var query = req.query;

    if (this.method == 'GET') {
        if (type === 'list') {
            var result = yield componentDao.getComponetList();
            this.body = result;
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
        fs.writeFileSync(componentPath + '/' + 'component.md', postQuery.content);

        var thumbnailName = path.basename(postQuery.img);
        var componentUrl = '/files/components/'  + this.session.userId + '/' + componentId + '/' + 'component.md';
        var thumbnailUrl = '/files/components/thumbnail.png';

        if (thumbnailName) {
            if (fs.existsSync(userComponentPath + '/' + thumbnailName)) {
                fs.renameSync(userComponentPath + '/' + thumbnailName, componentPath + '/' + 'thumb' + path.extname(thumbnailName));
                thumbnailUrl = '/files/components/' + this.session.userId + '/' + componentId + '/' + 'thumb' + path.extname(thumbnailName);
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
        
        var userComponentPath = path.resolve(__dirname, '../static/files/components/' + this.session.userId);
        

        if (!fs.existsSync(userComponentPath)) {
            fs.mkdirSync(userComponentPath);
        }

        var componentPath = userComponentPath + '/' + componentId;
        if (!fs.existsSync(componentPath)) {
            fs.mkdirSync(componentPath);
        }

        fs.writeFileSync(componentPath + '/' + 'component.md', postQuery.content);

        var thumbnailName = path.basename(postQuery.img);
        var thumbnailUrl = '/files/components/thumbnail.png';
        var componentUrl = '/files/components/'  + this.session.userId + '/' + componentId + '/' + 'component.md';
        if (thumbnailName) {
            console.log(userComponentPath + '/' + thumbnailName);
            if (fs.existsSync(userComponentPath + '/' + thumbnailName)) {
                fs.renameSync(userComponentPath + '/' + thumbnailName, componentPath + '/' + 'thumb' + path.extname(thumbnailName));
                console.log(componentPath + '/' + 'thumb' + path.extname(thumbnailName));
                thumbnailUrl = '/files/components/' + this.session.userId + '/' + componentId + '/' + 'thumb' + path.extname(thumbnailName);
            }
        }

        var result = yield componentDao.modifyComponent([postQuery.title, postQuery.tag, postQuery.description, new Date(), componentUrl, thumbnailUrl, componentId, this.session.userId]);

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
}

module.exports = componet;