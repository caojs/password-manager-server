
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function(t) {
      t.increments('id');
      t.string('username');
      t.string('password');
      t.dateTime('created_at');
      t.dateTime('updated_at');
    }),

    knex.schema.createTable('accounts', function(t) {
      t.increments('id');
      t.string('account');
      t.string('account_password');
      t.integer('user_id');
      t.dateTime('created_at');
      t.dateTime('updated_at');
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('accounts')
  ]);
};
