module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './server/db/migrations'
    },
    pool: {
      min: 0,
      max: 7
    }
  }

};
