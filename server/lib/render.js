var views = require('co-views');

module.exports = views(__dirname + '/../static/src', {
  map: { html: 'swig' }
});