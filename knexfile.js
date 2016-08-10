module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev_db/dev.sqlite3'
    },
    migrations: {
      directory: './server/db/migrations'
    }
  }

};
