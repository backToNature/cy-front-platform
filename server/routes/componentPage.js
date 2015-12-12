const render = require('../lib/render');
const componetDao = require('../dao/component');
const parse = require('co-busboy');
const postParse = require('co-body');
const fs = require('fs');
const path = require('path');
const componentDao = require('../dao/component');
const util = require('util');
const componentModel = require('../model/component');
const md = require( "markdown" ).markdown;
const moment = require("moment");

function *componet(key) {
    var req = this.request;
    var res = this.response;
    var query = req.query;

    if (this.method == 'GET') {
        if (key === 'submit') {
            if (!this.session.userId) {
                this.redirect = ('/src/login.html');
            }
            var userInfo = this.session;
            this.body = yield render('submit', userInfo);
        }

    }

}

var routePages = {
    submit: function *() {
        if (!this.session.userId) {
            this.redirect = ('/src/login.html');
        }
        var userInfo = this.session;
        var data = {
            userInfo: userInfo
        };
        this.body = yield render('submit', data);
    },
    modify: function *(componentId) {
        if (!this.session.userId) {
            this.redirect('/src/login.html');
        }
        var isHasThisComponent = yield componentDao.validateUserIsHasThisComponent([componentId, this.session.userId]);
        if (!isHasThisComponent) {
            this.redirect = ('/');
        }
        var result = yield componentDao.getComponentById([componentId]);
        var component = result[0];

        var componentPath = path.resolve(__dirname, '../static/files/components', componentId.toString());
        component.content = fs.readFileSync(path.join(componentPath, 'component.md'), 'utf8');
        var data = {
            userInfo: this.session,
            component: component
        };
        this.body = yield render('modify', data);
    },
    detail: function *(componentId) {
        var result = yield componentDao.getComponentById([componentId]);
        if (!result[0]) {
            this.redirect = ('/');
        }
        var info = result[0];
        var componentPath = path.resolve(__dirname, '../static/files/components', componentId.toString());
        var content = fs.readFileSync(path.join(componentPath, 'component.md'), 'utf8');
        var tree = md.parse(content);
        var html = md.toHTML(content);
        var header = tree.filter(function (item) {
            return item[0] === 'header';
        });
        var tocData = componentModel.getToc(header);
        console.log(tocData);
        html = html.replace(/<pre>/g, '<pre class="prettyprint">');
        info.content = html;
        info.ctime = moment(info.ctime).format("YYYY-MM-DD HH:mm:ss");
        info.utime = moment(info.utime).format("YYYY-MM-DD HH:mm:ss");

        var data = {
            info: info,
            userInfo: this.session
        };
        this.body = yield render('detail', data);
    },
    index: function *() {
        var componentList = yield componentDao.getComponetList();
        var userInfo = this.session;
        componentList.forEach(function (item) {
            item.ctime = moment(item.ctime).format("YYYY-MM-DD HH:mm:ss");
            item.utime = moment(item.utime).format("YYYY-MM-DD HH:mm:ss");
        });
        var tagList = componentModel.getTagList(componentList);
        var data = {
            tagList: tagList,
            componentList: componentList,
            userInfo: userInfo
        };
        this.body = yield render('index', data);
    },
    myComponent: function *() {
        if (!this.session.userId) {
            this.redirect('/src/login.html');
        }
        var userInfo = this.session;
        var componentList = yield componentDao.getUserComponent([this.session.userId]);
        componentList.forEach(function (item) {
            item.ctime = moment(item.ctime).format("YYYY-MM-DD HH:mm:ss");
            item.utime = moment(item.utime).format("YYYY-MM-DD HH:mm:ss");
        });
        var data = {
            componentList: componentList,
            userInfo: userInfo
        };
        this.body = yield render('myComponent', data);
    }
};

module.exports = routePages;