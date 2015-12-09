const render = require('../lib/render');
const componetDao = require('../dao/component');
const parse = require('co-busboy');
const postParse = require('co-body');
const fs = require('fs');
const path = require('path');
const componentDao = require('../dao/component');
const util = require('util');
const componentModel = require('../model/component');

function *componet(componentId) {
    var req = this.request;
    var res = this.response;
    var query = req.query;

    if (this.method == 'GET') {
        var markdownFile = 
    }

}

module.exports = componet;