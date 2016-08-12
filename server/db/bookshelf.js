const knex = require('./knex.js');
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('visibility');

module.exports = bookshelf;
