const render = require('../lib/render');
const componetDao = require('../dao/component');
const parse = require('co-busboy');
const fs = require('fs');
const path = require('path');

function *componet(type) {

    if (type === 'submitImg') {
        if (!this.session.userId) {
            this.body = {
                code: 200,
                status: 'failed',
                msg: 'please login first'
            };
            return;
        }

        if (!fs.existsSync(path.resolve(__dirname, '../static/files/' + this.session.userId))) {
            fs.mkdirSync(path.resolve(__dirname, '../static/files/' + this.session.userId));
        }
        var parts = parse(this);
        var part, filename;
        while (part = yield parts) {
            var stream = fs.createWriteStream(path.resolve(__dirname, '../static/files/'  + this.session.userId + '/thumbnail' + path.extname(part.filename)));
            part.pipe(stream);
            filename = part.filename;
            console.log('uploading %s -> %s', part.filename, stream.path);
        }
        this.body = {
            code: 200,
            status: 'success',
            img: '/files/'+ this.session.userId +'/thumbnail' + path.extname(filename),
            msg: 'uploading success'
        };
    }

}

module.exports = componet;