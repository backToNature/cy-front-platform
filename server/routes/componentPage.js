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
        this.body = yield render('submit', userInfo);
    },
    modify: function *(componentId) {
        if (!this.session.userId) {
            this.redirect = ('/src/login.html');
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
        console.log(md.toHTMLTree( tree ));
        var html = md.toHTML(content)
        html = html.replace(/<pre>/g, '<pre class="prettyprint">');
        info.content = html;
        info.ctime = info.ctime.valueOf();
        info.utime = info.utime.valueOf();

        var data = {
            info: info
        };
        this.body = yield render('detail', data);
    },
    index: function *() {
        var componentList = yield componentDao.getComponetList();
        var data = {
            componentList: componentList
        };
        console.log(data);
        this.body = yield render('index', data);
    }
};

module.exports = routePages;